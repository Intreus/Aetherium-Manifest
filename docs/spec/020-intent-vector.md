# RFC 020: Intent Vector

## Scope
Defines intent extraction features and canonical value ranges.

## Non-goals
- Natural-language model selection.
- Prompt strategy details.

## Normative requirements (MUST/SHOULD/MAY)
- Parser **MUST** output: `intent_category`, `emotional_valence`, `uncertainty`, `urgency`.
- Numeric fields **MUST** be clamped to `[0,1]` except `emotional_valence` in `[-1,1]`.
- Unknown intents **SHOULD** map to `default`.
- Implementations **MAY** attach debug confidences as metadata.

## Input/Output schema
### Input
```json
{ "text": "string" }
```

### Output
```json
{
  "intent_category": "greeting|question|creation|destruction|search|calm|complex|default",
  "emotional_valence": 0.0,
  "uncertainty": 0.0,
  "urgency": 0.0
}
```

## Error handling
- Empty input **MUST** return default intent with `uncertainty=1.0`.
- Parse exceptions **MUST** return `INTENT_PARSE_ERROR`.

## Compatibility notes
- Field names are frozen for current major version.
- New categories must remain additive.
