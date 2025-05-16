
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Direction } from '@/components/sentiment/types';
import ScenarioDisplay from '@/components/game/ScenarioDisplay';
import GameResultDisplay from '@/components/game/GameResultDisplay';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import GameForm from '@/components/game/GameForm';
import { GamePredictionInput, GamePredictionResult, ScenarioData } from '@/types/game';
import { fetchScenario, getGameConfig, getGameResult, submitPrediction } from '@/services/gameService';

const RateReactionGame: React.FC = () => {
  // State for the game
  const [direction, setDirection] = useState<Direction | null>(null);
  const [yieldEstimate, setYieldEstimate] = useState<number>(0);
  const [confidence, setConfidence] = useState<number>(50);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [currentScenario, setCurrentScenario] = useState<ScenarioData | null>(null);
  const [gameResult, setGameResult] = useState<GamePredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useIsMobile();
  
  // Get game configuration
  const gameConfig = getGameConfig();
  
  // Load scenario on mount
  useEffect(() => {
    const loadScenario = async () => {
      try {
        const scenario = await fetchScenario();
        setCurrentScenario(scenario);
        setYieldEstimate(gameConfig.yieldRange.defaultValue);
        setConfidence(gameConfig.confidenceDefault);
      } catch (error) {
        toast.error("Failed to load scenario. Please try again.");
        console.error("Error loading scenario:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadScenario();
  }, []);
  
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!direction || !currentScenario) {
      toast.error("Please select a Fed response direction.");
      return;
    }
    
    // Create prediction data
    const predictionData: GamePredictionInput = {
      direction,
      yieldEstimate,
      confidence,
      timestamp: new Date()
    };
    
    try {
      // Submit prediction data (to be replaced with actual API call)
      await submitPrediction(predictionData);
      
      // Calculate result
      const result = getGameResult(direction, yieldEstimate, currentScenario);
      setGameResult(result);
      setSubmitted(true);
      
      // Show the result after a short delay
      setTimeout(() => {
        setShowResult(true);
      }, 800);
    } catch (error) {
      toast.error("Failed to submit prediction. Please try again.");
      console.error("Error submitting prediction:", error);
    }
  };
  
  // Reset the game
  const handleReset = async () => {
    setDirection(null);
    setYieldEstimate(gameConfig.yieldRange.defaultValue);
    setConfidence(gameConfig.confidenceDefault);
    setSubmitted(false);
    setShowResult(false);
    setLoading(true);
    
    try {
      // Get a new scenario (to be replaced with actual API call)
      const newScenario = await fetchScenario();
      setCurrentScenario(newScenario);
    } catch (error) {
      toast.error("Failed to load a new scenario. Please try again.");
      console.error("Error loading new scenario:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !currentScenario) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
        <div className="text-white">Loading scenario...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
      
      <motion.div 
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="game-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
                <CardContent className="p-3 space-y-2">
                  <ScenarioDisplay scenario={currentScenario} hideMetadata={true} />
                  
                  <GameForm 
                    direction={direction}
                    yieldEstimate={yieldEstimate}
                    confidence={confidence}
                    submitted={submitted}
                    yieldConfig={gameConfig.yieldRange}
                    onDirectionChange={setDirection}
                    onYieldChange={setYieldEstimate}
                    onConfidenceChange={setConfidence}
                    onSubmit={handleSubmit}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="game-result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
                <CardContent className={`${isMobile ? 'p-2' : 'p-3'}`}>
                  {gameResult && (
                    <GameResultDisplay 
                      direction={direction}
                      yieldEstimate={yieldEstimate}
                      confidence={confidence}
                      scenario={currentScenario}
                      result={gameResult}
                      onReset={handleReset}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RateReactionGame;
