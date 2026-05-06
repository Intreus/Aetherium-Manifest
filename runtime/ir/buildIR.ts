import type { BrainState } from "../agns/interpretIntent";
import type { AETHContract } from "../aeth/types";
import type { IR } from "./ir.types";

function clamp01(value: number, fallback = 0): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(1, value));
}

function normalizeFlow(flow: "inward" | "outward"): number {
  return flow === "inward" ? 0 : 1;
}

function mapPhase(law: string): number {
  switch (law) {
    case "STRANGE_ATTRACTOR":
      return 0.7;
    case "EQUILIBRIUM":
      return 0.3;
    default:
      return 0.5;
  }
}

function deriveIntent(brain: BrainState): number {
  const urgency = clamp01(brain.intent.urgency ?? 0.5, 0.5);
  const valence = clamp01(((brain.intent.emotionalValence ?? 0) + 1) / 2, 0.5);
  return clamp01((urgency + valence) / 2, 0.5);
}

export function buildIR(aeth: AETHContract, brain: BrainState): { ir: IR; debug: { aeth: AETHContract } } {
  const energy = clamp01(aeth.density, 0.5);
  const turbulence = clamp01(aeth.turbulence, 0.5);
  const coherence = 1 - turbulence;
  const entropy = turbulence;
  const stability = 1 - turbulence;
  const flow = normalizeFlow(aeth.flow);
  const phase = mapPhase(aeth.law);
  const intent = deriveIntent(brain);

  return {
    ir: {
      intent,
      coherence,
      entropy,
      energy,
      turbulence,
      flow,
      stability,
      phase,
    },
    debug: { aeth },
  };
}
