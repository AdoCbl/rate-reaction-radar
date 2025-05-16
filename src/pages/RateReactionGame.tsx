
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Direction } from '@/components/sentiment/types';
import ScenarioDisplay from '@/components/game/ScenarioDisplay';
import GameForm from '@/components/game/GameForm';
import GameResultDisplay from '@/components/game/GameResultDisplay';
import { calculateScore } from '@/components/game/gameData';
import { motion, AnimatePresence } from 'framer-motion';

const RateReactionGame: React.FC = () => {
  // State for the game
  const [direction, setDirection] = useState<Direction | null>(null);
  const [yieldEstimate, setYieldEstimate] = useState<number>(0);
  const [confidence, setConfidence] = useState<number>(50);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!direction) {
      toast.error("Please select a Fed response direction.");
      return;
    }
    
    // Calculate score
    const score = calculateScore(direction, yieldEstimate);
    
    console.log({
      direction,
      yieldEstimate,
      confidence,
      score,
      timestamp: new Date()
    });
    
    setSubmitted(true);
    
    // Show the result after a short delay
    setTimeout(() => {
      setShowResult(true);
    }, 1000);
  };
  
  // Reset the game
  const handleReset = () => {
    setDirection(null);
    setYieldEstimate(0);
    setConfidence(50);
    setSubmitted(false);
    setShowResult(false);
  };

  return (
    <div className="min-h-[calc(100vh-170px)] flex flex-col items-center justify-center py-8 px-4">
      <motion.div 
        className="w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-300">Rate Reaction Game</h1>
          <p className="text-slate-400 mt-2">
            Based on a real historical macro event, predict how the Fed and the market responded.
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="game-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
                <CardContent className="space-y-8 p-6">
                  <ScenarioDisplay hideMetadata={true} />
                  
                  <GameForm 
                    direction={direction}
                    yieldEstimate={yieldEstimate}
                    confidence={confidence}
                    submitted={submitted}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-full"
            >
              <Card className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
                <CardContent className="p-6">
                  <GameResultDisplay 
                    direction={direction}
                    yieldEstimate={yieldEstimate}
                    confidence={confidence}
                    onReset={handleReset}
                  />
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
