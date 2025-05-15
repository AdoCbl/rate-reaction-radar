
import React, { useState } from 'react';
import { DirectionButton, Direction } from '@/components/sentiment/DirectionButton';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock historical scenario data - in a real app this would come from an API
const historicalScenario = {
  scenario: "Core CPI surprised to the upside at +1.2% MoM. Unemployment ticked down to 3.4%. The equity market opened flat.",
  fedResponse: "hike" as Direction,
  yieldChange: 15, // basis points
  date: "March 2022",
  context: "This was during the period when inflation concerns began to dominate Fed policy considerations."
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
  
  // Render the game result
  const renderResult = () => {
    const score = calculateScore();
    const scoreClass = score >= 80 ? 'text-direction-up' : score >= 50 ? 'text-direction-neutral' : 'text-direction-down';
    
    return (
      <div className="space-y-6 animate-scale-in">
        <h3 className="text-lg font-semibold">Historical Outcome</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Actual Fed Response</p>
            <p className="font-medium">
              {historicalScenario.fedResponse.charAt(0).toUpperCase() + historicalScenario.fedResponse.slice(1)}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Actual Yield Change</p>
            <p className="font-medium">
              {historicalScenario.yieldChange > 0 ? '+' : ''}
              {historicalScenario.yieldChange} bps
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500 mb-1">Context</p>
          <p className="text-sm">{historicalScenario.context}</p>
          <p className="text-xs text-gray-400 mt-2">Date: {historicalScenario.date}</p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-md text-center">
          <p className="text-sm text-gray-500 mb-1">Your Score</p>
          <p className={`text-3xl font-bold ${scoreClass}`}>{score}/100</p>
        </div>
        
        <Button onClick={handleReset} variant="outline" className="w-full">
          Play Again
        </Button>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <Card className="p-6 shadow-sm">
        {!showResult ? (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-center text-finance-navy">
              Rate Reaction Game
            </h2>
            
            <div className="p-4 bg-finance-navy bg-opacity-5 rounded-md mb-6">
              <h3 className="font-medium mb-2">Historical Market Scenario</h3>
              <p className="text-sm">{historicalScenario.scenario}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question 1: Fed Response */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">How did the Fed respond?</label>
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
              
              {/* Question 2: Yield Estimate */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  How did the 2-year Treasury yield respond? (basis points)
                </label>
                <div className="px-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>-20 bps</span>
                    <span>0</span>
                    <span>+20 bps</span>
                  </div>
                  <Slider
                    min={-20}
                    max={20}
                    step={1}
                    value={[yieldEstimate]}
                    onValueChange={(value) => setYieldEstimate(value[0])}
                  />
                  <div className="text-center mt-2">
                    <span className={cn(
                      "font-medium",
                      yieldEstimate > 0 ? "text-direction-up" : 
                      yieldEstimate < 0 ? "text-direction-down" : 
                      "text-direction-neutral"
                    )}>
                      {yieldEstimate > 0 ? '+' : ''}
                      {yieldEstimate} bps
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Confidence */}
              <ConfidenceSlider value={confidence} onChange={setConfidence} />
              
              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!direction || submitted}
              >
                {submitted ? (
                  <span className="flex items-center">
                    Processing <ArrowRight className="ml-2 animate-pulse" size={16} />
                  </span>
                ) : (
                  "Submit Your Prediction"
                )}
              </Button>
            </form>
          </div>
        ) : (
          renderResult()
        )}
      </Card>
    </div>
  );
};

export default RateReactionGame;
