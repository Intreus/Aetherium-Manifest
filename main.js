import { AetheriumEngine } from "./runtime/engine/AetheriumEngine.ts";

const engine = new AetheriumEngine();

export function runManifest(input) {
  return engine.run(input);
}
