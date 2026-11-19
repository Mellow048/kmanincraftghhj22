import { useMemo } from "react";
import * as T from "three";
import { useFilmTime } from "../../engine";

const VERT = /* glsl */ `
varying vec3 wp;
void main(){
  vec4 p=modelMatrix*vec4(position,1.0); wp=p.xyz;
  gl_Position=projectionMatrix*viewMatrix*p;
}`;
const FRAG = /* glsl */ `
uniform float seconds;
uniform float warm;
varying vec3 wp;
float hash(vec2 p){return fract(sin(dot(p,vec2(17.31,78.19)))*49361.22);}
float wave(vec2 p,float t){
  return sin(dot(p,vec2(2.61,5.72))-1.82*t)*0.40
    +sin(dot(p,vec2(-3.52,8.32))+2.14*t)*0.36
    +sin(dot(p,vec2(8.47,3.64))-2.57*t)*0.24;
}
void main(){
  vec3 view=normalize(cameraPosition-wp);
  vec2 p=wp.xz, g=floor(p*23.0)/23.0;
  float f=wave(p,seconds), q=wave(g,seconds);
  vec3 n=normalize(vec3((f-wave(p+vec2(0.028,0.0),seconds))*0.71,1.0,
    (f-wave(p+vec2(0.0,0.028),seconds))*0.67));
  float fres=pow(1.0-abs(view.y),3.7);
  vec3 col=mix(vec3(0.024,0.195,0.220),vec3(0.120,0.335,0.386),fres);
  float shelf=1.0-smoothstep(5.4,11.0,length((p-vec2(5.8,30.8))*vec2(0.78,1.0)));
  float coast=1.0-smoothstep(-5.0,3.5,p.y+sin(p.x*0.44));
  col+=vec3(0.020,0.080,0.035)*(shelf+coast*0.7)*(1.0-fres);
  col*=0.96+f*.10+q*.12;
  vec3 sun=normalize(mix(vec3(-0.56,0.49,0.54),vec3(-0.62,0.20,0.53),warm));
  float gleam=max(0.0,dot(reflect(-sun,n),view));
  col+=mix(vec3(.39,.65,.67),vec3(.94,.46,.19),warm)*(pow(gleam,25.0)*.14+pow(gleam,140.0)*.70);
  float crest=smoothstep(.51,.82,q)*smoothstep(.28,.91,sin(g.y*13.0+g.x*4.0+seconds*1.2))*.38;
  float dist=length(cameraPosition-wp);
  col+=vec3(.19,.31,.29)*crest;
  col=mix(col,mix(vec3(.27,.42,.51),vec3(.63,.34,.25),warm),smoothstep(18.,105.,dist)*fres);
  if(cameraPosition.y<0.0){
    float floorSun=pow(max(0.,dot(normalize(vec3(-.35,.86,-.29)),-view)),5.);
    col=mix(vec3(.024,.175,.202),vec3(.23,.57,.52),floorSun*.8+max(0.,q)*.19);
    col+=vec3(.06,.13,.125)*smoothstep(.55,.8,q);
  }
  gl_FragColor=vec4(col,1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

/** Opaque, double-sided ocean: the submerged cameras see a lit ceiling, not the sky. */
export function Sea({ warm }: { warm: boolean }) {
  const seconds=useFilmTime();
  const uniforms=useMemo(()=>({seconds:{value:0},warm:{value:0}}),[]);
  uniforms.seconds.value=seconds;
  uniforms.warm.value=warm ? 1 : 0;
  return <mesh position={[1,0,14]} rotation-x={-Math.PI/2}>
    <planeGeometry args={[215,217]}/>
    <shaderMaterial vertexShader={VERT} fragmentShader={FRAG} uniforms={uniforms} side={T.DoubleSide}/>
  </mesh>;
}
