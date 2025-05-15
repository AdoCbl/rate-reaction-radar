
import { Direction } from '@/components/sentiment/types';

// Mock historical scenario data - in a real app this would come from an API
export const historicalScenario = {
  scenario: "Core CPI surprised to the upside at +1.2% MoM. Unemployment ticked down to 3.4%. The equity market opened flat.",
  fedResponse: "hike" as Direction,
  yieldChange: 15, // basis points
  date: "March 2022",
  context: "This was during the period when inflation concerns began to dominate Fed policy considerations.",
  difficultyLevel: "Medium"
};

// Helper function to calculate score based on user input
export const calculateScore = (direction: Direction | null, yieldEstimate: number) => {
  let score = 0;
  
  // Score for direction (50%)
  if (direction === historicalScenario.fedResponse) {
    score += 50;
  }
  
  // Score for yield estimate (50% - based on proximity)
  const yieldDifference = Math.abs(yieldEstimate - historicalScenario.yieldChange);
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
