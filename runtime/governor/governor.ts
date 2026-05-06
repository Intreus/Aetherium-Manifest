import type { IR } from "../ir/ir.types";

const ENTROPY_THRESHOLD = 0.75;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

const LIMITS = {
  energy: [0, 1] as const,
  turbulence: [0, 0.7] as const,
};

export interface GovernedIR extends IR {
  flags: string[];
}

export function safeState(ir: Partial<IR> = {}): GovernedIR {
  return {
    intent: clamp(ir.intent ?? 0.5, 0, 1),
    coherence: clamp(ir.coherence ?? 0.5, 0, 1),
    entropy: clamp(ir.entropy ?? 0.5, 0, 1),
    energy: clamp(ir.energy ?? 0, ...LIMITS.energy),
    turbulence: clamp(ir.turbulence ?? 0.5, ...LIMITS.turbulence),
    flow: clamp(ir.flow ?? 0.5, 0, 1),
    stability: clamp(ir.stability ?? 0.5, 0, 1),
    phase: clamp(ir.phase ?? 0.5, 0, 1),
    flags: [],
  };
}

export class Governor {
  process(ir: Partial<IR>): GovernedIR {
    const governed = safeState(ir);

    if (governed.entropy > ENTROPY_THRESHOLD) {
      governed.flags.push("NIRODHA");
    }

    return governed;
  }
}
