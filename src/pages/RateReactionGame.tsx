
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Direction } from '@/components/sentiment/types';
import ScenarioDisplay from '@/components/game/ScenarioDisplay';
import GameForm from '@/components/game/GameForm';
import GameResultDisplay from '@/components/game/GameResultDisplay';
import { calculateScore } from '@/components/game/gameData';

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

  return (
    <div className="h-[calc(100vh-170px)] flex items-center justify-center">
      <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl overflow-hidden w-full max-w-md">
        {!showResult ? (
          <>
            <CardHeader className="pb-2 border-b border-gray-800">
              <ScenarioDisplay />
            </CardHeader>
            <CardContent className="space-y-4 py-4">
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
          </>
        ) : (
          <CardContent className="py-4">
            <GameResultDisplay 
              direction={direction}
              yieldEstimate={yieldEstimate}
              onReset={handleReset}
            />
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default RateReactionGame;
