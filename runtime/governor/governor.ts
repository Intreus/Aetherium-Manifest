import type { IR } from "../ir/ir.types.ts";
import { LIMITS } from "./policies.ts";

const ENTROPY_THRESHOLD = 0.75;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

export interface GovernedIR extends Omit<IR, "phase"> {
  phase: IR["phase"] | "idle";
  flags: string[];
}

export function safeState(): GovernedIR {
  return {
    intent: 0,
    coherence: 1,
    entropy: 0,
    energy: 0.2,
    turbulence: 0,
    flow: 1,
    stability: 1,
    phase: "idle",
    flags: [],
  };
}

export class Governor {
  process(ir: Partial<IR>): GovernedIR {
    const cloned = { ...ir };

    if (Number.isNaN(cloned.energy) || Number.isNaN(cloned.intent)) {
      const fallback = safeState();
      fallback.flags.push("REJECT_INVALID_INTENT");
      return fallback;
    }

    const governed: GovernedIR = {
      ...safeState(),
      ...cloned,
      intent: clamp(cloned.intent ?? 0, 0, 1),
      coherence: clamp(cloned.coherence ?? 1, 0, 1),
      entropy: clamp(cloned.entropy ?? 0, 0, 1),
      energy: clamp(cloned.energy ?? 0.2, ...LIMITS.energy),
      turbulence: clamp(cloned.turbulence ?? 0, ...LIMITS.turbulence),
      flow: clamp(cloned.flow ?? 1, 0, 1),
      stability: clamp(cloned.stability ?? 1, 0, 1),
      phase: (cloned.phase ?? "idle") as GovernedIR["phase"],
      flags: [],
    };

    if (governed.intent < 0 || governed.intent > 1) {
      const fallback = safeState();
      fallback.flags.push("REJECT_OUT_OF_RANGE");
      return fallback;
    }

    if (governed.energy > 0.9 && governed.turbulence > 0.6) {
      governed.turbulence = 0.4;
    }

    if (governed.entropy > ENTROPY_THRESHOLD) {
      governed.flags.push("NIRODHA");
    }

    return governed;
  }
}
