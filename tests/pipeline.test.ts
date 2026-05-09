import test from "node:test";
import assert from "node:assert/strict";
import { runPipeline } from "../runtime/runtime/pipeline.ts";

test("energy clamp", () => {
  const { ir } = runPipeline({ mode: "manifest", energy: 5 });
  assert.ok(ir.energy <= 1);
});

test("turbulence safety", () => {
  const { ir } = runPipeline({ mode: "manifest", energy: 1, entropy: 1 });
  assert.ok(ir.turbulence <= 0.7);
});

test("phase mapping", () => {
  const { ir } = runPipeline({ mode: "manifest" });
  assert.equal(ir.phase, "manifest");
});
