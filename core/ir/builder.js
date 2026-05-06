/**
 * @typedef {Object} PresenceIR
 * @property {{x:number,y:number,z:number}} anchor
 * @property {string} intent
 * @property {number} confidence
 * @property {number} energy
 * @property {number} coherence
 * @property {number} policyRisk
 * @property {import('../aeth/compiler.js').AETHContract} contract
 */

/**
 * buildIR(aeth, brainState) -> PresenceIR
 * @param {import('../aeth/compiler.js').AETHContract} aeth
 * @param {import('../agns/brain.js').BrainState} brainState
 * @returns {PresenceIR}
 */
export function buildIR(aeth, brainState) {
  const intent = brainState.intent;
  const confidence = 1 - (intent.uncertainty ?? 0.5);
  return {
    anchor: { x: 0, y: 0, z: 0 },
    intent: intent.intentCategory,
    confidence,
    energy: Math.max(0, Math.min(1, (intent.urgency ?? 0) + 0.2)),
    coherence: Math.max(0, Math.min(1, confidence + 0.1)),
    policyRisk: Math.max(0, Math.min(1, Math.abs(intent.emotionalValence ?? 0) * 0.2)),
    contract: aeth,
  };
}
