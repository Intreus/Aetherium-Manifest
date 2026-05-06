/**
 * @typedef {Object} AETHContract
 * @property {string} condition
 * @property {string} behavior
 * @property {string} principle
 */

/**
 * compileAETH(brainState) -> AETHContract
 * @param {import('../agns/brain.js').BrainState} brainState
 * @returns {AETHContract}
 */
export function compileAETH(brainState) {
  const { urgency = 0 } = brainState.intent ?? {};
  return {
    condition: urgency > 0.7 ? "high_urgency" : "stable_flow",
    behavior: urgency > 0.7 ? "tighten photons" : "maintain harmonic drift",
    principle: "light_is_computational_substrate",
  };
}
