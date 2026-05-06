import { extractIntent } from "../intent.js";
import { processIntent } from "../agns/brain.js";
import { compileAETH } from "../aeth/compiler.js";
import { buildIR } from "../ir/builder.js";
import { Governor } from "./governor.js";
import { mapIRToUniforms } from "../../engine/uniforms.js";
import { semanticChecksum } from "./semanticChecksum.js";
import { validateIRInvariants } from "./irValidator.js";

export class AetherPipeline {
  constructor({ governor = new Governor() } = {}) {
    this.governor = governor;
  }

  run(input) {
    const intent = extractIntent(input);
    const intentChecksum = semanticChecksum(intent);
    const brainState = processIntent(intent);
    const brainChecksum = semanticChecksum(brainState);
    const aeth = compileAETH(brainState);
    const aethChecksum = semanticChecksum(aeth);
    const ir = buildIR(aeth, brainState);
    const irChecksum = semanticChecksum(ir);
    const irInvariant = validateIRInvariants(ir);

    if (!irInvariant.ok) {
      throw new Error(`IR invariant violation: ${irInvariant.violations.join('; ')}`);
    }

    const governedIR = this.governor.process(ir);
    const uniforms = mapIRToUniforms(governedIR);

    return {
      intent,
      brainState,
      aeth,
      ir,
      governedIR,
      uniforms,
      checksums: {
        intent: intentChecksum,
        brainState: brainChecksum,
        aeth: aethChecksum,
        ir: irChecksum,
      },
    };
  }
}
