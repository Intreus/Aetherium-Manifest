import { AetherPipeline } from "./core/runtime/pipeline.js";

const pipeline = new AetherPipeline();

export function runManifest(input) {
  return pipeline.run(input);
}
