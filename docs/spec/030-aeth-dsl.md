# RFC 030: AETH DSL

## Scope
Defines the intermediate contract language for causal manifestation rules.

## Non-goals
- Full formal grammar for third-party compilers.
- UI templating.

## Normative requirements (MUST/SHOULD/MAY)
- AETH clauses **MUST** follow: `IF condition THEN behavior BECAUSE principle`.
- Compiler **MUST** preserve semantic ordering of clauses.
- Authors **SHOULD** keep conditions side-effect free.
- Runtime **MAY** annotate clauses with confidence metadata.

## Input/Output schema
### Input
```json
{
  "brain_state": {
    "intent": "string",
    "energy": 0.0,
    "coherence": 0.0
  }
}
```

### Output
```json
{
  "clauses": [
    {"if": "state condition", "then": "light behavior", "because": "principle"}
  ]
}
```

## Error handling
- Missing clause segments **MUST** return `AETH_SYNTAX_ERROR`.
- Unsupported operators **SHOULD** return `AETH_UNSUPPORTED_OPERATOR`.

## Compatibility notes
- Clause triplet keys (`if/then/because`) are stable.
- Additional optional keys must not alter required semantics.
