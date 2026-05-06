# RFC 060: Security and Privacy

## Scope
Defines data handling, key management, and runtime privacy safeguards.

## Non-goals
- Organization-wide legal policy.
- External IAM architecture.

## Normative requirements (MUST/SHOULD/MAY)
- Secrets **MUST NOT** be persisted in long-term browser storage by default.
- Runtime **MUST** redact sensitive tokens from telemetry.
- Session data **SHOULD** be bounded by retention TTL.
- Implementations **MAY** support encrypted local caches with explicit opt-in.

## Input/Output schema
### Input
```json
{
  "security_event": "string",
  "payload": {"contains_secret": true}
}
```

### Output
```json
{
  "sanitized_payload": {},
  "action": "allow|redact|block",
  "audit_code": "string"
}
```

## Error handling
- Sanitization failures **MUST** default to `block`.
- Unknown event types **SHOULD** be treated as high risk.

## Compatibility notes
- Privacy defaults are strict; relaxations require explicit profile flags.
