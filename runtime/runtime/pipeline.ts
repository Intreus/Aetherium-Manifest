import { extractIntent } from "../intent/extractIntent.ts";
import { interpretIntent } from "../agns/interpretIntent.ts";
import { compileAETH } from "../aeth/compileAETH.ts";
import { buildIR } from "../ir/buildIR.ts";
import { Governor } from "../governor/governor.ts";
import { mapIRToUniforms } from "../gpu/uniforms.ts";

export interface PipelineInput {
  mode?: string;
  energy?: number;
  entropy?: number;
}

export class AetherPipeline {
  private readonly governor: Governor;

  constructor(governor = new Governor()) {
    this.governor = governor;
  }

  run(input: string) {
    const intent = extractIntent(input);
    const brainState = interpretIntent(intent);
    const aeth = compileAETH(brainState);
    const { ir, debug: irDebug } = buildIR(aeth, brainState);
    const governedIR = this.governor.process(ir);
    const uniforms = mapIRToUniforms(governedIR);

    return { intent, brainState, aeth, ir, irDebug, governedIR, uniforms };
  }
}

export function runPipeline(input: PipelineInput = {}) {
  const governor = new Governor();

  const provisionalIR = {
    intent: input.mode === "manifest" ? 1 : 0,
    coherence: 1,
    entropy: input.entropy ?? 0,
    energy: input.energy ?? 0.2,
    turbulence: input.entropy ?? 0,
    flow: input.mode === "manifest" ? 0 : 1,
    stability: 1,
    phase: input.mode ?? "idle",
  };

  const ir = governor.process(provisionalIR);
  return { ir };
}
