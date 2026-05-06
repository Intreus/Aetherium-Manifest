# RFC 050: Governor Policy

## Scope
Defines safety and stability policy enforcement over Presence IR.

## Non-goals
- Human policy authoring workflows.
- Provider-side moderation policies.

## Normative requirements (MUST/SHOULD/MAY)
- Governor **MUST** clamp energy/turbulence beyond configured thresholds.
- If entropy exceeds threshold, system **MUST** activate NIRODHA stabilization mode.
- High policy risk **MUST** force `mode=clamped`.
- Governance decisions **SHOULD** be traceable with reason codes.
- Deployments **MAY** tune thresholds via config.

## Input/Output schema
### Input
```json
{
  "ir": {"energy": 0.0, "turbulence": 0.0, "policy_risk": 0.0},
  "thresholds": {"entropy": 0.8, "risk": 0.7}
}
```

### Output
```json
{
  "governed_ir": {"energy": 0.0, "turbulence": 0.0, "mode": "stable"},
  "reasons": ["string"]
}
```

## Error handling
- Missing thresholds **MUST** load safe defaults.
- Invalid threshold ordering **MUST** return `POLICY_CONFIG_ERROR`.

## Compatibility notes
- Default thresholds preserve prior behavior.
- Reason codes are additive and backward compatible.
