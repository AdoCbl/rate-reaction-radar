
import { calculateScore, gameConfig, mockScenario } from "@/data/mockGameData";
import { GamePredictionInput, GamePredictionResult, ScenarioData } from "@/types/game";
import { Direction } from "@/components/sentiment/types";

/**
 * Fetch a game scenario - currently returns mock data
 * TODO: Replace with actual API call to Azure backend
 */
export async function fetchScenario(): Promise<ScenarioData> {
  try {
    // FUTURE: Implement actual API call here
    // const response = await fetch('https://your-azure-function-url/api/scenarios/random');
    // if (!response.ok) throw new Error('Failed to fetch scenario');
    // return await response.json();
    
    // For now, return mock data
    return mockScenario;
  } catch (error) {
    console.error("Error fetching scenario:", error);
    throw error;
  }
}

/**
 * Submit a prediction to the backend
 * TODO: Replace with actual API call to Azure backend
 */
export async function submitPrediction(prediction: GamePredictionInput): Promise<void> {
  try {
    // FUTURE: Implement actual API call here
    // const response = await fetch('https://your-azure-function-url/api/predictions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(prediction)
    // });
    // if (!response.ok) throw new Error('Failed to submit prediction');
    
    // For now, just log the prediction
    console.log("Prediction submitted:", prediction);
    return Promise.resolve();
  } catch (error) {
    console.error("Error submitting prediction:", error);
    throw error;
  }
}

/**
 * Get the result of a prediction based on the current scenario
 * TODO: Replace with actual API call to Azure backend
 */
export function getGameResult(
  direction: Direction | null, 
  yieldEstimate: number, 
  scenario: ScenarioData = mockScenario
): GamePredictionResult {
  const score = calculateScore(direction, yieldEstimate, scenario);
  const isDirectionCorrect = direction === scenario.fedResponse;
  const yieldDifference = Math.abs(yieldEstimate - scenario.yieldChange);
  
  return {
    score,
    isDirectionCorrect,
    yieldDifference,
    actualDirection: scenario.fedResponse,
    actualYieldChange: scenario.yieldChange
  };
}

/**
 * Get default game configuration
 */
export function getGameConfig() {
  return gameConfig;
}
