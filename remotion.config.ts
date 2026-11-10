import { Config } from "@remotion/cli/config";

// Frame-accurate output for a fast pipeline.
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setCrf(18);

// WebGL in headless Chrome. If rendering ever fails with "WebGL not supported",
// run with:  npx remotion render ... --gl=swangle
// On a machine with a GPU, `--gl=angle` is much faster.
Config.setChromiumOpenGlRenderer("swangle");
