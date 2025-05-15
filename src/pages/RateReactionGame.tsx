
import React, { useState } from 'react';
import { DirectionButton } from '@/components/sentiment/DirectionButton';
import { Direction } from '@/components/sentiment/types';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, Info, BarChart3, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Mock historical scenario data - in a real app this would come from an API
const historicalScenario = {
  scenario: "Core CPI surprised to the upside at +1.2% MoM. Unemployment ticked down to 3.4%. The equity market opened flat.",
  fedResponse: "hike" as Direction,
  yieldChange: 15, // basis points
  date: "March 2022",
  context: "This was during the period when inflation concerns began to dominate Fed policy considerations.",
  difficultyLevel: "Medium"
};

const RateReactionGame: React.FC = () => {
  // State for the game
  const [direction, setDirection] = useState<Direction | null>(null);
  const [yieldEstimate, setYieldEstimate] = useState<number>(0);
  const [confidence, setConfidence] = useState<number>(50);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Calculate score based on accuracy
  const calculateScore = () => {
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
  
  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!direction) {
      toast.error("Please select a Fed response direction.");
      return;
    }
    
    // Calculate score
    const score = calculateScore();
    
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
    }, 500);
  };
  
  // Reset the game
  const handleReset = () => {
    setDirection(null);
    setYieldEstimate(0);
    setConfidence(50);
    setSubmitted(false);
    setShowResult(false);
  };
  
  // Render the game result
  const renderResult = () => {
    const score = calculateScore();
    const scoreClass = score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-sky-400' : 'text-red-400';
    
    return (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Historical Outcome</h3>
          <Badge variant="outline" className="bg-gray-800/30 text-white border-gray-700">
            {historicalScenario.date}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-md border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Actual Fed Response</p>
            <p className="font-medium text-white">
              {historicalScenario.fedResponse.charAt(0).toUpperCase() + historicalScenario.fedResponse.slice(1)}
            </p>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded-md border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Actual Yield Change</p>
            <p className="font-medium text-white">
              {historicalScenario.yieldChange > 0 ? '+' : ''}
              {historicalScenario.yieldChange} bps
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/50 rounded-md border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Market Context</p>
          <p className="text-sm text-gray-300">{historicalScenario.context}</p>
        </div>
        
        <motion.div 
          className="flex flex-col items-center p-6 border border-gray-700 rounded-md bg-gray-800/30 backdrop-blur-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="mb-2 text-sm text-gray-400">Your Score</div>
          <div className={`text-4xl font-bold mb-2 ${scoreClass}`}>{score}</div>
          <div className="text-xs text-gray-500">out of 100</div>
          
          {score >= 80 ? (
            <Badge className="mt-3 bg-emerald-500/20 text-emerald-400 border-emerald-600/30">Excellent</Badge>
          ) : score >= 50 ? (
            <Badge className="mt-3 bg-sky-500/20 text-sky-400 border-sky-600/30">Good</Badge>
          ) : (
            <Badge className="mt-3 bg-red-500/20 text-red-400 border-red-600/30">Try Again</Badge>
          )}
        </motion.div>
        
        <div className="flex gap-3">
          <Button onClick={handleReset} variant="outline" className="w-full border-gray-700 bg-transparent hover:bg-gray-800 text-white">
            New Scenario
          </Button>
          <Button 
            variant="default" 
            className="w-full bg-sky-600 hover:bg-sky-700 text-white"
            onClick={() => window.location.href = '/leaderboard'}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Leaderboard
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl overflow-hidden">
        {!showResult ? (
          <>
            <CardHeader className="pb-2 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  Historical Market Scenario
                </h2>
                <Badge variant="outline" className="bg-gray-800/30 text-white border-gray-700">
                  {historicalScenario.difficultyLevel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-6">
              <motion.div 
                className="p-4 bg-gray-800/50 rounded-md border border-gray-700 shadow-inner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-300">{historicalScenario.scenario}</p>
              </motion.div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Question 1: Fed Response */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">How did the Fed respond?</label>
                  <div className="grid grid-cols-3 gap-3">
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
                </div>
                
                <Separator className="bg-gray-800" />
                
                {/* Question 2: Yield Estimate */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    How did the 2-year Treasury yield respond? (basis points)
                  </label>
                  <div className="px-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>-50 bps</span>
                      <span>0</span>
                      <span>+50 bps</span>
                    </div>
                    <Slider
                      min={-50}
                      max={50}
                      step={1}
                      value={[yieldEstimate]}
                      onValueChange={(value) => setYieldEstimate(value[0])}
                      className="mb-4"
                    />
                    <div className="text-center">
                      <motion.span 
                        className={cn(
                          "font-medium text-lg",
                          yieldEstimate > 0 ? "text-emerald-400" : 
                          yieldEstimate < 0 ? "text-red-400" : 
                          "text-gray-400"
                        )}
                        key={yieldEstimate}
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {yieldEstimate > 0 ? '+' : ''}
                        {yieldEstimate} bps
                      </motion.span>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-gray-800" />
                
                {/* Confidence */}
                <ConfidenceSlider value={confidence} onChange={setConfidence} />
                
                <div className="flex items-center text-xs text-gray-400 mt-2 bg-gray-800/30 p-2 rounded-md">
                  <Info size={14} className="mr-1 text-sky-400" />
                  <span>Your responses will be scored based on accuracy and confidence level.</span>
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium"
                  disabled={!direction || submitted}
                >
                  {submitted ? (
                    <motion.span 
                      className="flex items-center"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                    >
                      Processing <ArrowRight className="ml-2" size={16} />
                    </motion.span>
                  ) : (
                    "Submit Your Prediction"
                  )}
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <CardContent className="py-6">
            {renderResult()}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default RateReactionGame;
