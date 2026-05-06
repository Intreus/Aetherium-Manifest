const SCALAR_KEYS = ['confidence', 'energy', 'coherence', 'turbulence', 'flow', 'policyRisk'];

function isFinite01(value) {
  return Number.isFinite(value) && value >= 0 && value <= 1;
}

export function validateIRInvariants(ir) {
  const violations = [];

  if (!ir || typeof ir !== 'object') {
    return { ok: false, violations: ['IR is not an object'] };
  }

  for (const key of SCALAR_KEYS) {
    if (!isFinite01(ir[key])) violations.push(`${key} must be a finite scalar within [0,1]`);
  }

  if (!ir.anchor || !Number.isFinite(ir.anchor.x) || !Number.isFinite(ir.anchor.y) || !Number.isFinite(ir.anchor.z)) {
    violations.push('anchor must include finite x,y,z coordinates');
  }

  if (Math.abs((1 - ir.coherence) - ir.turbulence) > 0.001) {
    violations.push('turbulence must equal 1 - coherence');
  }

  if (Math.abs(ir.flow - ir.energy) > 0.001) {
    violations.push('flow must stay semantically aligned with energy');
  }

  return { ok: violations.length === 0, violations };
}
