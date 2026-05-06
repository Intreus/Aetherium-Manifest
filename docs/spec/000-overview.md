# RFC 000: Aetherium Specification Overview

## Scope
Defines the specification suite, document ordering, and normative language conventions for Aetherium.

## Non-goals
- Defining implementation-specific UI details.
- Replacing module-level design docs.

## Normative requirements (MUST/SHOULD/MAY)
- Implementations **MUST** interpret RFC keywords per RFC 2119/8174.
- Implementations **MUST** treat `docs/spec/*.md` as the source of truth for behavior contracts.
- New normative behavior **SHOULD** be added via new RFC sections and changelog entries.
- Experimental behaviors **MAY** be documented as non-normative appendices.

## Input/Output schema
### Input
```yaml
spec_request:
  id: string
  target_rfc: string
  version: string
```

### Output
```yaml
spec_resolution:
  accepted: boolean
  normative_refs: [string]
  notes: string
```

## Error handling
- Unknown RFC identifiers **MUST** return `SPEC_NOT_FOUND`.
- Version parse failures **MUST** return `INVALID_VERSION`.
- Circular cross-reference detection **SHOULD** return `SPEC_REFERENCE_LOOP`.

## Compatibility notes
- This overview is backward compatible with existing runtime modules.
- Future RFC additions must preserve prior stable sections unless explicitly deprecated.
