/**
 * @typedef {Object} IntentVector
 * @property {string} intentCategory
 * @property {number} emotionalValence
 * @property {number} uncertainty
 * @property {number} urgency
 */

/**
 * extractIntent(input) -> IntentVector
 * @param {string} input
 * @returns {IntentVector}
 */
export function extractIntent(input = "") {
  const text = String(input).trim().toLowerCase();
  const isQuestion = text.includes("?");
  const intentCategory = isQuestion ? "question" : text ? "default" : "calm";

  return {
    intentCategory,
    emotionalValence: 0,
    uncertainty: isQuestion ? 0.4 : 0.2,
    urgency: 0.2,
  };
}
