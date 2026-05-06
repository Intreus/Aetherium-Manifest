import { AetherPipeline } from "../core/runtime/pipeline.js";
import { Renderer } from "../engine/renderer.js";

export class UIController {
  constructor({ pipeline = new AetherPipeline(), renderer = new Renderer() } = {}) {
    this.pipeline = pipeline;
    this.renderer = renderer;
  }

  submit(input) {
    const frame = this.pipeline.run(input);
    return this.renderer.render(frame.uniforms);
  }
}
