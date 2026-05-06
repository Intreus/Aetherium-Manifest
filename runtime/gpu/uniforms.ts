import type { GovernedIR } from "../governor/governor";

export function mapIRToUniforms(ir: Partial<GovernedIR>) {
  const mode = (ir.flags ?? []).includes("CLAMP") ? 2 : (ir.flags ?? []).includes("NIRODHA") ? 1 : 0;

  return {
    uAnchor: [ir.anchor?.x ?? 0, ir.anchor?.y ?? 0, ir.anchor?.z ?? 0],
    uMode: mode,
    uEnergy: ir.energy ?? 0,
    uTurbulence: ir.turbulence ?? Math.max(0, Math.min(1, 1 - (ir.coherence ?? 0.5))),
    uFlow: ir.flow ?? ir.energy ?? 0,
    uCoherence: ir.coherence ?? 0.5,
    uConfidence: ir.confidence ?? 0.5,
    uPolicyRisk: ir.policyRisk ?? 0,
    uIntentCode: hashIntent(ir.intent),
    uConstraint: (ir.flags ?? []).includes("CLAMP") ? 1 : 0,
  };
}

function hashIntent(intent: unknown) {
  return [...String(intent ?? "")].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 1024;
}
