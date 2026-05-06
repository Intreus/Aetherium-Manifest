const ENTROPY_THRESHOLD = 0.75;
const POLICY_RISK_THRESHOLD = 0.7;

export class Governor {
  /**
   * governor.process(ir) -> GovernedIR
   * @param {import('../ir/builder.js').PresenceIR & {entropy?: number}} ir
   */
  process(ir) {
    const governed = { ...ir, flags: [] };

    if ((ir.entropy ?? 0) > ENTROPY_THRESHOLD) {
      governed.flags.push("NIRODHA");
      governed.energy = Math.min(governed.energy, 0.45);
      governed.coherence = Math.max(governed.coherence, 0.85);
    }

    if (governed.policyRisk > POLICY_RISK_THRESHOLD) {
      governed.flags.push("CLAMP");
      governed.energy = Math.min(governed.energy, 0.35);
    }

    return governed;
  }
}
