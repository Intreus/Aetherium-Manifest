import type { BrainState } from "../agns/interpretIntent.ts";
import type { AETHContract } from "./types";

export type { AETHContract } from "./types";

export function compileAETH(brainState: BrainState): AETHContract {
  const { urgency = 0.2, uncertainty = 0.2 } = brainState.intent ?? {};
  const intensity = Math.max(0, Math.min(1, urgency));
  const entropy = Math.max(0, Math.min(1, uncertainty));

  if (brainState.class === "ACTIVE") {
    return {
      shape: "vortex",
      density: 0.8 * intensity,
      turbulence: 0.3 + entropy * 0.4,
      flow: "inward",
      law: "STRANGE_ATTRACTOR",
    };
  }

  return {
    shape: "field",
    density: 0.2,
    turbulence: 0.05,
    flow: "outward",
    law: "EQUILIBRIUM",
  };
}
