# RFC 090: Migration

## Scope
Defines version upgrade paths and deprecation policy for spec consumers.

## Non-goals
- Source-code auto-migration tooling.
- Release calendar management.

## Normative requirements (MUST/SHOULD/MAY)
- Breaking changes **MUST** increment major spec version.
- Deprecations **MUST** provide at least one minor version overlap.
- Migration guides **SHOULD** include before/after schema examples.
- Tooling **MAY** provide compatibility shims for one major cycle.

## Input/Output schema
### Input
```json
{"from_version": "1.1", "to_version": "2.0", "artifacts": ["ir.json"]}
```

### Output
```json
{"status": "requires_changes", "actions": ["rename field x->y"], "risk": "medium"}
```

## Error handling
- Unsupported version jumps **MUST** return `MIGRATION_PATH_UNAVAILABLE`.
- Invalid semantic versions **MUST** return `MIGRATION_VERSION_INVALID`.

## Compatibility notes
- Minor version migrations should be non-breaking.
- Shim behavior expires at announced major boundaries.
