# RFC 070: Telemetry

## Scope
Defines runtime observability events and metrics emission contracts.

## Non-goals
- Vendor-specific dashboard configuration.
- Long-term analytics warehouse schema.

## Normative requirements (MUST/SHOULD/MAY)
- Telemetry **MUST** include stage timing and governor decision events.
- Emissions **MUST** avoid plaintext secrets.
- Metrics **SHOULD** include transition durations for LISTENING/THINKING/RESONATING/RESPONDING.
- Implementations **MAY** sample high-volume debug events.

## Input/Output schema
### Input
```json
{
  "event": "pipeline_stage_complete",
  "context": {"stage": "THINKING", "duration_ms": 42}
}
```

### Output
```json
{
  "accepted": true,
  "event_id": "string",
  "export_targets": ["console", "otlp"]
}
```

## Error handling
- Export failures **MUST** not break rendering path.
- Backpressure **SHOULD** degrade to sampled mode.

## Compatibility notes
- Core event names are stable.
- Additional attributes are optional and additive.
