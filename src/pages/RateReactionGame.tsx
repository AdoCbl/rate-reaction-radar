import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Direction } from '@/components/sentiment/types';
import ScenarioDisplay from '@/components/game/ScenarioDisplay';
import GameResultDisplay from '@/components/game/GameResultDisplay';
import { calculateScore } from '@/components/game/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { DirectionButton } from '@/components/sentiment/DirectionButton';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import YieldEstimateInput from '@/components/game/YieldEstimateInput';
import { Info } from 'lucide-react';

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
    <div className="min-h-[calc(100vh-170px)] flex flex-col items-center justify-center py-4 px-3">
      <motion.div 
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-indigo-300">Rate Reaction Game</h1>
          <p className="text-slate-400 text-sm">
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
                <CardContent className={`space-y-4 ${isMobile ? 'p-3' : 'p-4'}`}>
                  <ScenarioDisplay hideMetadata={true} />
                  
                  <div className="space-y-3">
                    {/* Question 1: Fed Response */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white`}>
                        What do you think the Fed did in response?
                      </h3>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <DirectionButton 
                          direction="hike" 
                          selected={direction === 'hike'} 
                          onClick={setDirection}
                        />
                        <DirectionButton 
                          direction="hold" 
                          selected={direction === 'hold'} 
                          onClick={setDirection}
                        />
                        <DirectionButton 
                          direction="cut" 
                          selected={direction === 'cut'} 
                          onClick={setDirection}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Question 2: Yield Estimate */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white`}>
                        How do you think the 2-Year Treasury Yield reacted?
                      </h3>
                      <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-3">
                        <YieldEstimateInput 
                          yieldEstimate={yieldEstimate} 
                          onYieldChange={setYieldEstimate} 
                        />
                      </div>
                    </motion.div>
                    
                    {/* Confidence Section */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white`}>
                        How confident are you in your prediction?
                      </h3>
                      <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-3">
                        <ConfidenceSlider value={confidence} onChange={setConfidence} />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Prediction Summary */}
                  {direction && (
                    <motion.div
                      className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-2.5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="text-slate-400 text-center text-sm block">
                        You predicted: <span className="font-semibold text-white">{direction.charAt(0).toUpperCase() + direction.slice(1)}</span> | 
                        <span className="font-semibold text-white"> {yieldEstimate > 0 ? '+' : ''}{yieldEstimate} bps</span> | 
                        Confidence: <span className="font-semibold text-white">{confidence}%</span>
                      </span>
                    </motion.div>
                  )}
                  
                  {/* Submit Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-2"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                      whileHover={!submitted && direction ? { scale: 1.02, y: -2 } : {}}
                    >
                      <Button 
                        onClick={handleSubmit}
                        className={`w-full py-4 font-medium rounded-lg transition-all duration-300 shadow-lg text-base
                          ${submitted 
                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' 
                            : !direction 
                              ? 'bg-slate-700 text-slate-300 cursor-not-allowed opacity-70' 
                              : 'bg-gradient-to-br from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white hover:shadow-sky-500/20 hover:shadow-xl'
                          }`}
                        disabled={!direction || submitted}
                      >
                        {submitted ? "Processing..." : "Submit Your Prediction"}
                      </Button>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Info size={16} className="mr-2 text-blue-400 flex-shrink-0" />
                    <span>Your responses will be scored based on accuracy and confidence level.</span>
                  </motion.div>
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
                <CardContent className={`${isMobile ? 'p-4' : 'p-5'}`}>
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
