# RFC 080: Conformance Profiles

## Scope
Defines implementation profiles and minimum compliance criteria.

## Non-goals
- Certification process governance.
- Product packaging guidance.

## Normative requirements (MUST/SHOULD/MAY)
- Implementations **MUST** declare a profile: `core`, `interactive`, or `hardened`.
- `core` profile **MUST** satisfy RFC 020/040/050 minimum fields.
- `interactive` profile **SHOULD** provide telemetry and transition timing.
- `hardened` profile **MUST** enforce strict privacy controls.
- Vendors **MAY** publish extended profile manifests.

## Input/Output schema
### Input
```json
{"profile": "core", "evidence": ["test-report.json"]}
```

### Output
```json
{"conformant": true, "failed_requirements": [], "notes": "string"}
```

## Error handling
- Unknown profile **MUST** return `PROFILE_UNSUPPORTED`.
- Missing evidence **SHOULD** return `PROFILE_EVIDENCE_INCOMPLETE`.

## Compatibility notes
- Profiles are additive; existing profile semantics remain unchanged.
