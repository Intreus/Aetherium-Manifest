import type { IntentVector } from "../intent/extractIntent";

export interface StateTransition {
  from: string;
  to: string;
  duration: number;
  easing: string;
  energyShift: number;
}

export interface BrainState {
  intent: IntentVector;
  class: "ACTIVE" | "IDLE";
  complexity: "HIGH" | "MEDIUM" | "LOW";
  phase: "LISTENING" | "THINKING" | "RESONATING" | "RESPONDING";
  transitions: StateTransition[];
}

export function interpretIntent(intent: IntentVector): BrainState {
  const isManifestMode = intent.intentCategory === "manifest";
  const complexity: "HIGH" | "MEDIUM" | "LOW" = isManifestMode
    ? intent.urgency >= 0.6
      ? "HIGH"
      : "MEDIUM"
    : "LOW";

  return {
    intent,
    class: isManifestMode ? "ACTIVE" : "IDLE",
    complexity,
    phase: "RESPONDING",
    transitions: [
      { from: "LISTENING", to: "THINKING", duration: 120, easing: "easeIn", energyShift: 0.1 },
      { from: "THINKING", to: "RESONATING", duration: 180, easing: "easeOut", energyShift: 0.2 },
      { from: "RESONATING", to: "RESPONDING", duration: 140, easing: "linear", energyShift: 0.1 },
    ],
  };
}
