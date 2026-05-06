# AGENTS.md

## Purpose
Aetherium Manifest is evolving from a visual prototype into an intent-governed runtime. Prioritize architecture that preserves semantic intent, canonical state, and policy enforcement before rendering.

## Architectural Principles
1. **Cognition before rendering**: keep `Intent → AGNS → AETH → IR → Governor → GPU` as the primary contract.
2. **IR is canonical world state**: do not derive truth from renderer side effects.
3. **Governance is constitutional**: governor may validate, reject, fallback, and degrade—never clamp-only.
4. **Semantic + physical split**: keep intent meaning separate from visual physics and merge deliberately.

## Implementation Rules
- Preserve separation between:
  - semantic intent fields (`intent_type`, `source`, `trust`)
  - physical fields (`energy`, `entropy`, `turbulence`, `flow`)
- Any invalid or unsafe intent must be rejectable with safe idle fallback.
- Prefer continuous transitions (`blend/lerp`) over hard mode switches where possible.
- Avoid replacing GPU uniform object references on every frame; update `.value` on existing uniforms.

## Documentation Rules
- When runtime contracts change, update `README.md` and relevant docs under `docs/spec/`.
- Keep examples deterministic and explicit about fallback/safe-state behavior.
