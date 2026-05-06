export type Scalar01 = number; // enforce via runtime clamps

export interface IR {
  intent: Scalar01;
  coherence: Scalar01;
  entropy: Scalar01;
  energy: Scalar01;
  turbulence: Scalar01;
  flow: Scalar01;
  stability: Scalar01;
  phase: Scalar01;
}
