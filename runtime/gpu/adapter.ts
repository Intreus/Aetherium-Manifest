export class GPUAdapter {
  constructor(private readonly renderer?: { render: (uniforms: unknown) => unknown }) {}

  applyUniforms(material: { uniforms?: Record<string, unknown> } | undefined, uniforms: Record<string, unknown>) {
    if (!material) return uniforms;
    material.uniforms = { ...(material.uniforms ?? {}), ...uniforms };
    return material.uniforms;
  }

  render(uniforms: Record<string, unknown>) {
    if (!this.renderer || typeof this.renderer.render !== "function") {
      return { status: "noop", uniforms };
    }
    return this.renderer.render(uniforms);
  }
}
