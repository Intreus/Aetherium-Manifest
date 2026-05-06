import type { BrainState } from "../agns/interpretIntent";
import type { AETHContract } from "./types";

export type { AETHContract } from "./types";

export function compileAETH(brainState: BrainState): AETHContract {
  const { urgency = 0, uncertainty = 0.5 } = brainState.intent ?? {};

  if (urgency > 0.7) {
    return {
      law: "STRANGE_ATTRACTOR",
      density: 0.8,
      turbulence: 0.6,
      flow: "outward",
    };
  }

  return {
    law: uncertainty > 0.6 ? "EQUILIBRIUM" : "STRANGE_ATTRACTOR",
    density: 0.4,
    turbulence: uncertainty > 0.6 ? 0.3 : 0.2,
    flow: uncertainty > 0.6 ? "inward" : "outward",
  };
}
