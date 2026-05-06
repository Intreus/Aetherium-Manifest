import { extractIntent } from "../intent.js";
import { processIntent } from "../agns/brain.js";
import { compileAETH } from "../aeth/compiler.js";
import { buildIR } from "../ir/builder.js";
import { Governor } from "./governor.js";
import { mapIRToUniforms } from "../../engine/uniforms.js";

export class AetherPipeline {
  constructor({ governor = new Governor() } = {}) {
    this.governor = governor;
  }

  run(input) {
    const intent = extractIntent(input);
    const brainState = processIntent(intent);
    const aeth = compileAETH(brainState);
    const ir = buildIR(aeth, brainState);
    const governedIR = this.governor.process(ir);
    const uniforms = mapIRToUniforms(governedIR);

    return { intent, brainState, aeth, ir, governedIR, uniforms };
  }
}
