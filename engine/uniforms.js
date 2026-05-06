/**
 * mapIRToUniforms(ir) -> UniformMap
 * @param {import('../core/ir/builder.js').PresenceIR & {flags?: string[]}} ir
 */
export function mapIRToUniforms(ir) {
  return {
    uAnchor: [ir.anchor.x, ir.anchor.y, ir.anchor.z],
    uEnergy: ir.energy,
    uCoherence: ir.coherence,
    uConfidence: ir.confidence,
    uPolicyRisk: ir.policyRisk,
    uIntentCode: hashIntent(ir.intent),
    uConstraint: (ir.flags ?? []).includes("CLAMP") ? 1 : 0,
  };
}

function hashIntent(intent) {
  return [...String(intent)].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 1024;
}
