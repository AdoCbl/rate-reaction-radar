
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Direction } from '@/components/sentiment/types';
import ScenarioDisplay from '@/components/game/ScenarioDisplay';
import GameResultDisplay from '@/components/game/GameResultDisplay';
import { calculateScore } from '@/components/game/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import GameForm from '@/components/game/GameForm';

const RateReactionGame: React.FC = () => {
  // State for the game
  const [direction, setDirection] = useState<Direction | null>(null);
  const [yieldEstimate, setYieldEstimate] = useState<number>(0);
  const [confidence, setConfidence] = useState<number>(50);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const isMobile = useIsMobile();
  
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
    }, 800);
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
    <div className="h-full flex">
      {/* Enhanced dark background with gradient */}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-full"
            >
              <Card className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
                <CardContent className={`${isMobile ? 'p-2' : 'p-3'}`}>
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
