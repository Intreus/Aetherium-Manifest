/**
 * mapIRToUniforms(ir) -> UniformMap
 * @param {import('../core/ir/builder.js').PresenceIR & {flags?: string[], turbulence?:number, flow?:number}} ir
 */
export function mapIRToUniforms(ir) {
  const mode = (ir.flags ?? []).includes('CLAMP') ? 2 : (ir.flags ?? []).includes('NIRODHA') ? 1 : 0;

  return {
    uAnchor: [ir.anchor.x, ir.anchor.y, ir.anchor.z],
    uMode: mode,
    uEnergy: ir.energy,
    uTurbulence: ir.turbulence ?? Math.max(0, Math.min(1, 1 - ir.coherence)),
    uFlow: ir.flow ?? ir.energy,
    uCoherence: ir.coherence,
    uConfidence: ir.confidence,
    uPolicyRisk: ir.policyRisk,
    uIntentCode: hashIntent(ir.intent),
    uConstraint: (ir.flags ?? []).includes('CLAMP') ? 1 : 0,
  };
}

function hashIntent(intent) {
  return [...String(intent)].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 1024;
}
