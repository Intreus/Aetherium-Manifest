# RFC 040: Presence IR

## Scope
Defines the render-oriented intermediate representation consumed by governance and uniforms mapping.

## Non-goals
- GPU shader source specification.
- Cross-engine serialization format guarantees.

## Normative requirements (MUST/SHOULD/MAY)
- IR **MUST** include energy, turbulence, flow, mode, and policy-risk fields.
- IR values **MUST** be normalized before governance.
- Builder **SHOULD** include source trace metadata in debug mode.
- Implementations **MAY** add vendor-specific optional fields.

## Input/Output schema
### Input
```json
{
  "aeth": {"clauses": []},
  "brain_state": {"energy": 0.0, "coherence": 0.0}
}
```

### Output
```json
{
  "mode": "stable|active|clamped",
  "energy": 0.0,
  "turbulence": 0.0,
  "flow": 0.0,
  "policy_risk": 0.0
}
```

## Error handling
- Missing required fields **MUST** return `IR_SCHEMA_ERROR`.
- NaN/Infinity values **MUST** trigger safe-state IR fallback.

## Compatibility notes
- Core scalar fields remain mandatory across profiles.
- Optional extensions must be ignorable without failure.
