export interface IR {
  intent: string;
  coherence: number;
  entropy: number;
  energy: number;
  turbulence: number;
  flow: number;
  stability: number;
  phase: "manifest" | "idle";
}
