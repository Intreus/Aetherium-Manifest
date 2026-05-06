const ENTROPY_THRESHOLD = 0.75;
const POLICY_RISK_THRESHOLD = 0.7;
const OVERLOAD_ENERGY_THRESHOLD = 0.9;
const OVERLOAD_TURBULENCE_THRESHOLD = 0.6;
const TURBULENCE_REDUCTION_FACTOR = 0.65;

function clamp01(value, fallback = 0) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(1, value));
}

export function safeState(ir = {}) {
  const energy = clamp01(ir.energy, 0);
  const coherence = clamp01(ir.coherence, 0.5);
  const confidence = clamp01(ir.confidence, 0.5);
  const policyRisk = clamp01(ir.policyRisk, 0);

  const turbulenceInput = ir.turbulence ?? 1 - coherence;
  const turbulence = clamp01(turbulenceInput, 0.5);
  const flow = clamp01(ir.flow ?? energy, 0);

  return {
    anchor: {
      x: Number.isFinite(ir?.anchor?.x) ? ir.anchor.x : 0,
      y: Number.isFinite(ir?.anchor?.y) ? ir.anchor.y : 0,
      z: Number.isFinite(ir?.anchor?.z) ? ir.anchor.z : 0,
    },
    intent: typeof ir.intent === 'string' && ir.intent ? ir.intent : 'default',
    confidence,
    energy,
    coherence,
    turbulence,
    flow,
    policyRisk,
    contract: ir.contract ?? { condition: 'SAFE', behavior: 'STABLE', principle: 'fallback' },
    entropy: clamp01(ir.entropy ?? 0, 0),
    flags: Array.isArray(ir.flags) ? [...ir.flags] : [],
  };
}

export class Governor {
  /**
   * governor.process(ir) -> GovernedIR
   * @param {import('../ir/builder.js').PresenceIR & {entropy?: number,turbulence?:number,flow?:number}} ir
   */
  process(ir) {
    const governed = safeState(ir);

    if (governed.entropy > ENTROPY_THRESHOLD) {
      governed.flags.push('NIRODHA');
      governed.energy = Math.min(governed.energy, 0.45);
      governed.coherence = Math.max(governed.coherence, 0.85);
      governed.turbulence = Math.min(governed.turbulence, 0.4);
      governed.flow = Math.min(governed.flow, governed.energy);
    }

    if (governed.policyRisk > POLICY_RISK_THRESHOLD) {
      governed.flags.push('CLAMP');
      governed.energy = Math.min(governed.energy, 0.35);
      governed.flow = Math.min(governed.flow, governed.energy);
    }

    if (governed.energy > OVERLOAD_ENERGY_THRESHOLD && governed.turbulence > OVERLOAD_TURBULENCE_THRESHOLD) {
      governed.flags.push('OVERLOAD_DAMPED');
      governed.turbulence = clamp01(governed.turbulence * TURBULENCE_REDUCTION_FACTOR, OVERLOAD_TURBULENCE_THRESHOLD);
      governed.flow = Math.min(governed.flow, governed.energy);
    }

    return governed;
  }
}
