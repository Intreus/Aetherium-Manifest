export class Renderer {
  render(uniforms) {
    return {
      status: "rendered",
      uniforms,
      timestamp: Date.now(),
    };
  }
}
