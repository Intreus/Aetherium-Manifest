# Aetherium Manifest

Aetherium Manifest is a browser-native **intent-to-photonic** simulation runtime where light acts as the computational substrate. User input is parsed into an intent vector, transformed into an 8D manifold state, then rendered as governed particle behavior through WebGL/Three.js.

## Core Runtime Flow

`User Input → Intent Vector → 8D Manifold → Simulation → Photonic Collapse`

The runtime pipeline is designed around four state transitions:

1. **LISTENING**
2. **THINKING**
3. **RESONATING**
4. **RESPONDING**

Each transition is intended to carry:
- duration
- easing
- energy shift

## Intent Vector Schema

Incoming messages are resolved into intent features that drive morphology:

```json
{
  "intent_category": "greeting | question | creation | destruction | search | calm | complex | default",
  "emotional_valence": "-1.0..1.0",
  "uncertainty": "0.0..1.0",
  "urgency": "0.0..1.0"
}
```

## 8D Manifold Canonical State

The governed scene evolves within an 8D state contract:

- `(x, y, z)` → spatial anchor
- `intent` → system state
- `confidence` → probability field
- `energy` → kinetic expression
- `coherence` → structural stability
- `policy_risk` → constraint boundary

## AETH Contract

All manifestation behavior should follow:

- **IF** `[state condition]`
- **THEN** `[light behavior]`
- **BECAUSE** `[reasoning principle]`

## Governance Rules

- If `entropy > threshold` → activate **NIRODHA** stabilization.
- If `policy_risk` is high → clamp system output.
- Runtime governor enforces bounded energy/turbulence for safe rendering.

## Simulation Engine Responsibilities

Instead of producing plain text answers, the engine should:

1. Build scene graph
2. Apply attractors and boundaries
3. Simulate particle interaction
4. Resolve conflicts via interference

## Current Front-End Runtime Features

- Three.js shader-driven particle field (`vertex` + `fragment` shaders)
- HUD telemetry for IR/state visibility
- Key-gated provider connection modal (Anthropic API)
- Demo mode fallback with local intent classification
- Governed IR → GPU uniform mapping (`uEnergy`, `uTurbulence`, `uFlow`, etc.)
- Overlay-based manifestation feedback (`INTENT_CLASS` + descriptor)

## Notes

- API keys are intended to remain in session memory only.
- The system can run without an external provider in demo mode.
