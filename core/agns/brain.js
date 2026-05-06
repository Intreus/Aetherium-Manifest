/**
 * @typedef {Object} BrainState
 * @property {import('../intent.js').IntentVector} intent
 * @property {"LISTENING"|"THINKING"|"RESONATING"|"RESPONDING"} phase
 * @property {Array<{from:string,to:string,duration:number,easing:string,energyShift:number}>} transitions
 */

/**
 * processIntent(intent) -> BrainState
 * @param {import('../intent.js').IntentVector} intent
 * @returns {BrainState}
 */
export function processIntent(intent) {
  return {
    intent,
    phase: "RESPONDING",
    transitions: [
      { from: "LISTENING", to: "THINKING", duration: 120, easing: "easeIn", energyShift: 0.1 },
      { from: "THINKING", to: "RESONATING", duration: 180, easing: "easeOut", energyShift: 0.2 },
      { from: "RESONATING", to: "RESPONDING", duration: 140, easing: "linear", energyShift: 0.1 },
    ],
  };
}
