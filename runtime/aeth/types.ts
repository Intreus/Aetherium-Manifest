export type AETHFlow = "inward" | "outward";
export type AETHLaw = "STRANGE_ATTRACTOR" | "EQUILIBRIUM";

export interface AETHContract {
  shape: "vortex" | "field";
  density: number;
  turbulence: number;
  flow: AETHFlow;
  law: AETHLaw;
}
