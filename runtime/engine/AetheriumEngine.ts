import { AetherPipeline } from "../runtime/pipeline";
import { GPUAdapter } from "../gpu/adapter";

export class AetheriumEngine {
  private readonly pipeline: AetherPipeline;
  private readonly gpuAdapter: GPUAdapter;

  constructor({ pipeline = new AetherPipeline(), gpuAdapter = new GPUAdapter() } = {}) {
    this.pipeline = pipeline;
    this.gpuAdapter = gpuAdapter;
  }

  run(input: string, material?: { uniforms?: Record<string, unknown> }) {
    const result = this.pipeline.run(input);
    const appliedUniforms = this.gpuAdapter.applyUniforms(material, result.uniforms);
    const render = this.gpuAdapter.render(result.uniforms);

    return { ...result, appliedUniforms, render };
  }
}
