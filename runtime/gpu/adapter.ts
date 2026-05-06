export class GPUAdapter {
  constructor(private readonly renderer?: { render: (uniforms: unknown) => unknown }) {}

  applyUniforms(
    material: { uniforms?: Record<string, { value: unknown } | unknown> } | undefined,
    uniforms: Record<string, unknown>,
  ) {
    if (!material) return uniforms;

    if (!material.uniforms) {
      material.uniforms = {};
    }

    for (const [key, value] of Object.entries(uniforms)) {
      const existing = material.uniforms[key] as { value: unknown } | undefined;
      if (existing && typeof existing === "object" && "value" in existing) {
        existing.value = value;
      } else {
        material.uniforms[key] = { value };
      }
    }

    return material.uniforms;
  }

  render(uniforms: Record<string, unknown>) {
    if (!this.renderer || typeof this.renderer.render !== "function") {
      return { status: "noop", uniforms };
    }
    return this.renderer.render(uniforms);
  }
}
