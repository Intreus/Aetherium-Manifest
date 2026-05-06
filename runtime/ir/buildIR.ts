import type { BrainState } from "../agns/interpretIntent";
import type { AETHContract } from "../aeth/compileAETH";
import type { IR } from "./ir.types";

function clamp01(value: number, fallback = 0): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(1, value));
}

export interface IRDebugEnvelope {
  confidence: number;
  policyRisk: number;
  contract: AETHContract;
}

export function buildIR(aeth: AETHContract, brainState: BrainState): { ir: IR; debug: IRDebugEnvelope } {
  const intent = brainState.intent;
  const turbulence = clamp01(aeth.turbulence, 0.5);
  const energy = clamp01(aeth.density, 0.5);

  const ir: IR = {
    intent: intent.intentCategory,
    coherence: 1 - turbulence,
    entropy: turbulence,
    energy,
    turbulence,
    flow: aeth.flow === "inward" ? -1 : 1,
    stability: 1 - turbulence,
    phase: aeth.shape === "vortex" ? "manifest" : "idle",
  };

  return {
    ir,
    debug: {
      confidence: clamp01(1 - (intent.uncertainty ?? 0.5), 0.5),
      policyRisk: clamp01(Math.abs(intent.emotionalValence ?? 0) * 0.2),
      contract: aeth,
    },
  };
}
