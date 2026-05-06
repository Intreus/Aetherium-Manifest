# RFC 010: Architecture

## Scope
Specifies runtime components and orchestration boundaries from input parsing to rendering.

## Non-goals
- Low-level shader optimization details.
- Build tooling mandates.

## Normative requirements (MUST/SHOULD/MAY)
- The system **MUST** execute the flow: `Input -> Intent -> BrainState -> AETH -> IR -> Governor -> Uniforms -> Render`.
- Each pipeline stage **MUST** expose a deterministic interface for identical inputs.
- Components **SHOULD** avoid side effects outside their ownership boundary.
- Implementations **MAY** add observability hooks between stages.

## Input/Output schema
### Input
```json
{
  "user_input": "string",
  "runtime_context": {
    "session_id": "string",
    "mode": "demo|provider"
  }
}
```

### Output
```json
{
  "render_frame": {
    "ir": "PresenceIR",
    "uniforms": "UniformMap",
    "state": "RESPONDING"
  }
}
```

## Error handling
- Stage contract mismatches **MUST** emit `PIPELINE_CONTRACT_ERROR`.
- Non-recoverable renderer failures **MUST** emit `RENDER_FATAL` and trigger safe fallback.
- Recoverable provider failures **SHOULD** switch to demo mode.

## Compatibility notes
- Existing module paths remain valid.
- Additional stages must preserve previous stage outputs.
