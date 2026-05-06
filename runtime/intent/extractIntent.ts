export interface IntentVector {
  intentCategory: string;
  emotionalValence: number;
  uncertainty: number;
  urgency: number;
}

export function extractIntent(input = ""): IntentVector {
  const text = String(input).trim().toLowerCase();
  const isQuestion = text.includes("?");
  const intentCategory = isQuestion ? "question" : text ? "default" : "calm";

  return {
    intentCategory,
    emotionalValence: 0,
    uncertainty: isQuestion ? 0.4 : 0.2,
    urgency: 0.2,
  };
}
