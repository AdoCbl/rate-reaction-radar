
import { Direction } from "@/components/sentiment/types";

export interface ScenarioData {
  id: string;
  scenario: string;
  fedResponse: Direction;
  yieldChange: number;
  date: string;
  context: string;
  difficultyLevel: "Easy" | "Medium" | "Hard";
}

export interface YieldRangeConfig {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface GameConfig {
  yieldRange: YieldRangeConfig;
  confidenceDefault: number;
}

export interface GamePredictionInput {
  direction: Direction | null;
  yieldEstimate: number;
  confidence: number;
  timestamp: Date;
}

export interface GamePredictionResult {
  score: number;
  isDirectionCorrect: boolean;
  yieldDifference: number;
  actualDirection: Direction;
  actualYieldChange: number;
}
