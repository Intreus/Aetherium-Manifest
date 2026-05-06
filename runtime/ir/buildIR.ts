import type { BrainState } from "../agns/interpretIntent";
import type { AETHContract } from "../aeth/compileAETH";

export interface PresenceIR {
  anchor: { x: number; y: number; z: number };
  intent: string;
  confidence: number;
  energy: number;
  coherence: number;
  turbulence: number;
  flow: number;
  policyRisk: number;
  contract: AETHContract;
}

export function buildIR(aeth: AETHContract, brainState: BrainState): PresenceIR {
  const intent = brainState.intent;
  const confidence = 1 - (intent.uncertainty ?? 0.5);
  const energy = Math.max(0, Math.min(1, (intent.urgency ?? 0) + 0.2));
  const coherence = Math.max(0, Math.min(1, confidence + 0.1));

  return {
    anchor: { x: 0, y: 0, z: 0 },
    intent: intent.intentCategory,
    confidence,
    energy,
    coherence,
    turbulence: Math.max(0, Math.min(1, 1 - coherence)),
    flow: energy,
    policyRisk: Math.max(0, Math.min(1, Math.abs(intent.emotionalValence ?? 0) * 0.2)),
    contract: aeth,
  };
}
