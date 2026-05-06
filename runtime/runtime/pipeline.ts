import { extractIntent } from "../intent/extractIntent";
import { interpretIntent } from "../agns/interpretIntent";
import { compileAETH } from "../aeth/compileAETH";
import { buildIR } from "../ir/buildIR";
import { Governor } from "../governor/governor";
import { mapIRToUniforms } from "../gpu/uniforms";

export class AetherPipeline {
  constructor(private readonly governor = new Governor()) {}

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
