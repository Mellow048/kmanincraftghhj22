#!/usr/bin/env python3
"""Dependency-free checks for the downloadable HTML/SVG pelican illustration.

Run from any directory: python3 scripts/check-pelican.py
This validates the actual published file, including the baked leg keyframes.
It neither modifies the illustration nor starts a browser / Remotion render.
"""
from html.parser import HTMLParser
from pathlib import Path
import math
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
FILE = ROOT / "pelican-riding-a-bicycle.html"
NS = {"s": "http://www.w3.org/2000/svg"}
NUMBER = r"[-+]?(?:\d+(?:\.\d*)?|\.\d+)"


def require(condition, message):
    if not condition:
        raise ValueError(message)


class Audit(HTMLParser):
    """HTML's own parser, not a grep for words in comments."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.labels = []
        self.elements = []
        self.style_depth = 0
        self.styles = []
        self.doctype = False

    def handle_decl(self, declaration):
        self.doctype = declaration.lower() == "doctype html"

    def handle_starttag(self, tag, attrs):
        require(tag not in {"script", "img", "image", "canvas", "foreignobject",
                            "iframe", "object", "embed", "video", "audio",
                            "link", "animate", "animatetransform", "animatemotion", "set"},
                f"Unexpected element <{tag}>: keep drawing and motion local and CSS-pausable.")
        attrs = dict(attrs)
        self.elements.append((tag, attrs))
        for name, value in attrs.items():
            require(not name.startswith("on"), f"Script event attribute {name} is forbidden.")
            require(name not in {"src", "srcset", "data", "action"}, f"External asset attribute: {name}.")
            if name in {"href", "xlink:href"}:
                require(value and value.startswith("#"), f"Non-local reference: {value}.")
                self.references.append(value[1:])
        if "id" in attrs:
            require(attrs["id"] not in self.ids, f"Duplicate ID: {attrs['id']}.")
            self.ids.add(attrs["id"])
        if tag == "label":
            self.labels.append(attrs.get("for"))
        if tag == "style":
            self.style_depth += 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag == "style":
            self.style_depth -= 1

    def handle_data(self, data):
        if self.style_depth:
            self.styles.append(data)


def keyframe_block(css, name):
    match = re.search(r"@keyframes\s+" + re.escape(name) + r"\s*\{", css)
    require(match is not None, f"Missing keyframes: {name}.")
    start = match.end()
    depth = 1
    for i in range(start, len(css)):
        depth += (css[i] == "{") - (css[i] == "}")
        if depth == 0:
            return css[start:i]
    raise ValueError(f"Unclosed keyframes: {name}.")


def numbers(text):
    return [float(n) for n in re.findall(NUMBER, text)]


def translation(element):
    value = element.get("transform", "")
    require(value.startswith("translate("), f"Expected placement wrapper on {element.get('id')}.")
    coords = numbers(value)
    require(len(coords) == 2, f"Expected 2D translation: {value}.")
    return coords


def sampled_angles(css, name):
    body = keyframe_block(css, name)
    pairs = re.findall(rf"({NUMBER})%\s*\{{\s*transform:\s*rotate\(({NUMBER})deg\);\s*\}}", body)
    require(len(pairs) == 73, f"{name}: expected 72 intervals and a closing pose.")
    points = [(float(p)/100, float(a)) for p, a in pairs]
    require(points[0][0] == 0 and points[-1][0] == 1, f"{name}: loop is incomplete.")
    require(abs(points[0][1] - points[-1][1]) < 1e-4, f"{name}: pose jumps on repeat.")
    require(all(abs(p-i/72) < 1e-8 for i, (p, _) in enumerate(points)), f"{name}: inconsistent sample times.")
    return points


def interpolate(points, t):
    # Use the published percentages, including their rounding, like the browser.
    i = min(71, int(t*72))
    if t < points[i][0] and i:
        i -= 1
    elif t > points[i+1][0] and i < 71:
        i += 1
    p0, a0 = points[i]
    p1, a1 = points[i+1]
    return math.radians(a0 + (a1-a0)*(t-p0)/(p1-p0))


def run():
    html = FILE.read_text(encoding="utf-8")
    audit = Audit()
    audit.feed(html)
    audit.close()
    require(audit.doctype, "Missing HTML5 doctype.")
    require(audit.style_depth == 0, "Unclosed style block.")
    require(set(audit.references) <= audit.ids, "Broken local SVG reference.")
    css = "\n".join(audit.styles)
    require(not re.search(r"@import|@font-face|expression\s*\(", css, re.I), "Styles must be self-contained.")
    for target in re.findall(r"url\(\s*['\"]?([^\s)'\"]+)", html):
        require(target.startswith("#") and target[1:] in audit.ids, f"Broken or remote paint reference: {target}.")
    require(not re.search(r"__(?:NEAR|FAR|CHAIN|SPOKES|GEAR)|<!-- KEYFRAMES -->", html), "Unexpanded authoring token.")
    require(FILE.stat().st_size < 100_000, "Keep this single-file illustration under 100 KB.")
    print("PASS: self-contained HTML/SVG; no scripts, raster media, remote assets, or duplicate/broken IDs.")

    source = re.search(r'<svg class="scene"[\s\S]*?</svg>', html)
    require(source is not None, "Missing main SVG.")
    svg = ET.fromstring(source.group())
    ids = {el.get("id"): el for el in svg.iter() if el.get("id")}
    require(svg.get("role") == "img", "SVG needs image semantics.")
    for attribute in ("aria-labelledby", "aria-describedby"):
        refs = svg.get(attribute, "").split()
        require(len(refs) == 1, f"Use a separate SVG title and description ({attribute}).")
        require(refs[0] in ids and (ids[refs[0]].text or "").strip(), f"Missing accessible SVG text: {refs[0]}.")
    inputs = [attrs for tag, attrs in audit.elements if tag == "input"]
    require(len(inputs) == 1 and inputs[0].get("type") == "checkbox", "Pause must be a native checkbox.")
    require(inputs[0].get("id") in audit.labels and inputs[0].get("aria-label"), "Pause control needs a label.")
    require(re.search(r"#pause-motion:checked\s*~\s*\.page\s+\.motion\s*\{\s*animation-play-state:\s*paused", css), "Pause must cover all motion.")
    require(re.search(r"@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.motion\s*\{\s*animation:\s*none\s*!important", css), "Missing reduced-motion fallback.")
    require("@media print" in css, "Missing print fallback.")
    print("PASS: accessible drawing, native pause control, reduced-motion and print fallbacks.")

    def duration(name):
        match = re.search(r"--" + name + rf"-time:\s*({NUMBER})s", css)
        require(match is not None, f"Missing {name} period.")
        return float(match.group(1))

    wheel_time, pedal_time = duration("wheel"), duration("pedal")
    require(wheel_time > 0 and abs(pedal_time/wheel_time - 1.5) < 1e-10, "Wrong 36:24 gear ratio.")
    tyre = ids["tyre-outline"]
    radius = float(tyre.get("r")) + float(tyre.get("stroke-width"))/2
    road_match = re.search(rf"translateX\((-{NUMBER})px\)", keyframe_block(css, "road-travel"))
    require(road_match is not None, "Missing negative ground displacement.")
    distance = -float(road_match.group(1))
    require(abs(distance - math.tau*radius) < 1e-6, "Road slides: one turn must travel one tyre circumference.")
    require("animation: road-travel var(--wheel-time) linear infinite" in css, "Road and wheel periods disagree.")
    require("animation: wheel-turn var(--wheel-time) linear infinite" in css, "Wheel speed is not linear.")
    uses = ids["moving-road"].findall("s:use", NS)
    positions = [float(el.get("x", 0)) for el in uses]
    require(len(uses) == 3 and all(abs(x-i*distance) < 1e-6 for i, x in enumerate(positions)), "Road tiles do not close seamlessly.")
    wheel_centres = [translation(ids[name]) for name in ("rear-wheel", "front-wheel")]
    require(wheel_centres[0][1] == wheel_centres[1][1] == 650, "Both tyres must meet the same road.")
    print(f"PASS: 3:2 gearing; {distance:.6f} units of road per wheel turn; contiguous road tiles.")

    worst_error = 0.0
    crank_phases = []
    for side in ("near", "far"):
        hip = translation(ids[f"{side}-hip"])
        crank = translation(ids[f"{side}-crank-origin"])
        pedal = translation(ids[f"{side}-pedal-origin"])
        require(pedal[1] == 0, "Pedal radius wrapper must lie on local X.")
        ankle = ids[f"{side}-ankle"]
        offset = [float(ankle.get("cx")), float(ankle.get("cy"))]
        shin_wrapper = ids[f"{side}-thigh"].find("s:g", NS)
        thigh_length, y = translation(shin_wrapper)
        require(y == 0, "Knee joint must lie on the thigh's local X axis.")
        shin_length = 114.0  # Rounded shin terminates at 114, as documented in the HTML.
        samples = [sampled_angles(css, f"{joint}-{side}") for joint in ("thigh", "shin")]
        for joint, points in zip(("thigh", "shin"), samples):
            base = numbers(ids[f"{side}-{joint}"].get("transform"))[0]
            require(abs(base - points[0][1]) < 1e-5, f"Static {side} {joint} is not the animation's first pose.")
            require(f"animation: {joint}-{side} var(--pedal-time) linear infinite" in css, f"Wrong limb easing / period: {joint}-{side}.")
        spin = numbers(re.sub(r"/\*.*?\*/", "", keyframe_block(css, f"crank-{side}")))
        counter = numbers(keyframe_block(css, f"counter-{side}"))
        require(len(spin) == len(counter) == 2, "Crank/counter-rotation must each have two endpoints.")
        require(abs(spin[1]-spin[0]-360) < 1e-9, "Cranks must pedal clockwise.")
        require(all(abs(a+b) < 1e-9 for a,b in zip(spin,counter)), "Pedals / feet do not stay level.")
        require(numbers(ids[f"{side}-crank"].get("transform"))[0] == spin[0], "Static crank phase differs.")
        crank_phases.append(spin[0])
        # 100 subsamples per keyframe interval catch interpolation gaps too.
        for i in range(7201):
            t = i/7200
            a, b = (interpolate(points, t) for points in samples)
            actual = (hip[0]+thigh_length*math.cos(a)+shin_length*math.cos(a+b),
                      hip[1]+thigh_length*math.sin(a)+shin_length*math.sin(a+b))
            theta = math.radians(spin[0]+360*t)
            target = (crank[0]+pedal[0]*math.cos(theta)+offset[0],
                      crank[1]+pedal[0]*math.sin(theta)+offset[1])
            error = math.dist(actual, target)
            worst_error = max(worst_error, error)
            require(error < .20, f"{side} ankle leaves its foot by {error:.4f} units at phase {t:.6f}.")
    require(abs(crank_phases[1]-crank_phases[0]-180) < 1e-9, "Cranks are not opposite.")
    print(f"PASS: 14,402 sampled leg poses; maximum ankle error {worst_error:.4f} SVG units (<0.20).")
    print(f"PASS: {FILE.name} ({FILE.stat().st_size:,} bytes). No build step needed.")


if __name__ == "__main__":
    try:
        run()
    except (ValueError, ET.ParseError, OSError, KeyError, AttributeError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        sys.exit(1)
