
import { Direction } from "@/components/sentiment/types";
import { GameConfig, ScenarioData } from "@/types/game";

// Mock historical scenario data
export const mockScenario: ScenarioData = {
  id: "scenario-2022-03",
  scenario: "Core CPI surprised to the upside at +1.2% MoM. Unemployment ticked down to 3.4%. The equity market opened flat.",
  fedResponse: "hike",
  yieldChange: 15, // basis points
  date: "March 2022",
  context: "This was during the period when inflation concerns began to dominate Fed policy considerations.",
  difficultyLevel: "Medium"
};

// Game configuration
export const gameConfig: GameConfig = {
  yieldRange: {
    min: -50,
    max: 50,
    step: 1,
    defaultValue: 0
  },
  confidenceDefault: 50
};

// Helper function to calculate score based on user input
export const calculateScore = (direction: Direction | null, yieldEstimate: number, actualScenario: ScenarioData) => {
  let score = 0;
  
  // Score for direction (50%)
  if (direction === actualScenario.fedResponse) {
    score += 50;
  }
  
  // Score for yield estimate (50% - based on proximity)
  const yieldDifference = Math.abs(yieldEstimate - actualScenario.yieldChange);
  if (yieldDifference <= 5) {
    score += 50; // Very close
  } else if (yieldDifference <= 10) {
    score += 35; // Close
  } else if (yieldDifference <= 20) {
    score += 15; // Not very close
  } else {
    score += 5; // Far off
  }
  
  return score;
};

// Game text content
export const gameText = {
  directions: {
    question: "What do you think the Fed did in response?",
    options: {
      hike: "Hike",
      hold: "Hold",
      cut: "Cut"
    }
  },
  yield: {
    question: "How do you think the 2-Year Treasury Yield reacted?",
  },
  confidence: {
    question: "How confident are you in your prediction?"
  },
  explanationLine: "The Fed responded to inflation concerns with a rate hike. Markets priced in more aggressive tightening ahead.",
  submit: "Submit Your Prediction",
  submitted: "Submitted!",
  tryAgain: "Try Another Scenario",
  viewLeaderboard: "View Leaderboard",
  outcomeHeader: "How the Fed Actually Responded"
};

// Game result text helpers
export const getYieldAccuracyText = (yieldDifference: number): string => {
  if (yieldDifference <= 5) return "Perfect!";
  if (yieldDifference <= 10) return "Very close";
  if (yieldDifference <= 20) return "Close";
  return "Missed";
};
