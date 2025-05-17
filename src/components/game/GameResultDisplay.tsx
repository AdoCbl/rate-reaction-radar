
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Direction } from '@/components/sentiment/types';
import ScenarioDisplay from './ScenarioDisplay';
import { GamePredictionResult, ScenarioData } from '@/types/game';
import { gameText, getYieldAccuracyText } from '@/data/mockGameData';

interface GameResultDisplayProps {
  direction: Direction | null;
  yieldEstimate: number;
  confidence: number;
  scenario: ScenarioData;
  result: GamePredictionResult;
  onReset: () => void;
}

const GameResultDisplay: React.FC<GameResultDisplayProps> = ({
  direction,
  yieldEstimate,
  confidence,
  scenario,
  result,
  onReset
}) => {
  const { score, isDirectionCorrect, yieldDifference } = result;
  const scoreClass = score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-primary' : 'text-red-500';
  
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-primary mb-4">{gameText.outcomeHeader}</h2>
        <ScenarioDisplay scenario={scenario} hideMetadata={false} />
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Your Prediction</div>
            <Badge 
              variant="outline" 
              className="bg-blue-50 text-blue-600 border-blue-200"
            >
              Confidence: {confidence}%
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-gray-800 text-xl">
                {direction?.charAt(0).toUpperCase() + (direction?.slice(1) || '')}
              </div>
              <div className="text-sm text-gray-500">Fed Response</div>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-xl">
                {yieldEstimate > 0 ? '+' : ''}{yieldEstimate} bps
              </div>
              <div className="text-sm text-gray-500">Yield Change</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Actual Outcome</div>
            <Badge className="bg-gray-100 text-gray-700 border-gray-200">
              {scenario.date}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className={`font-semibold text-xl ${isDirectionCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                {scenario.fedResponse.charAt(0).toUpperCase() + scenario.fedResponse.slice(1)}
                {isDirectionCorrect ? 
                  <span className="inline-block ml-2 text-emerald-500"><Check size={16} /></span> : 
                  <span className="inline-block ml-2 text-red-500">✗</span>
                }
              </div>
              <div className="text-sm text-gray-500">Fed Response</div>
            </div>
            <div>
              <div className={`font-semibold text-xl ${yieldDifference <= 10 ? 'text-emerald-500' : 'text-red-500'}`}>
                {scenario.yieldChange > 0 ? '+' : ''}{scenario.yieldChange} bps
                {yieldDifference <= 10 ? 
                  <span className="inline-block ml-2 text-emerald-500"><Check size={16} /></span> : 
                  <span className="inline-block ml-2 text-red-500">✗</span>
                }
              </div>
              <div className="text-sm text-gray-500">Yield Change</div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="text-sm text-gray-500 mb-2">Historical Context</div>
        <p className="text-gray-800">{gameText.explanationLine}</p>
        <p className="text-gray-800 mt-2">{scenario.context}</p>
      </motion.div>
      
      <motion.div 
        className="flex flex-col items-center p-8 border border-gray-200 rounded-xl bg-blue-50 backdrop-blur-sm shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="mb-2 text-base text-blue-700">Your Score</div>
        <div className={`text-5xl font-bold mb-3 ${scoreClass}`}>{score}</div>
        <div className="text-sm text-gray-500 mb-4">out of 100</div>
        
        {score >= 80 ? (
          <Badge className="px-3 py-1 bg-emerald-50 text-emerald-600 border-emerald-200">Excellent</Badge>
        ) : score >= 50 ? (
          <Badge className="px-3 py-1 bg-blue-50 text-blue-600 border-blue-200">Good</Badge>
        ) : (
          <Badge className="px-3 py-1 bg-red-50 text-red-600 border-red-200">Try Again</Badge>
        )}
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm mb-2">
            <span className={isDirectionCorrect ? "text-emerald-500" : "text-red-500"}>
              Fed Direction: {isDirectionCorrect ? "Correct" : "Incorrect"}
            </span>
            <span className="text-gray-400">•</span>
            <span className={`text-${yieldDifference <= 10 ? "emerald" : "red"}-500`}>
              Yield Estimate: {getYieldAccuracyText(yieldDifference)}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {isDirectionCorrect 
              ? "You correctly predicted the Fed's response! " 
              : "You missed the Fed's actual response. "}
            {yieldDifference <= 10 
              ? "Your yield estimate was very accurate." 
              : "Your yield estimate was off by " + yieldDifference + " bps."}
          </p>
        </div>
      </motion.div>
      
      <div className="flex gap-4 mt-6">
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="w-full border-gray-200 bg-white hover:bg-gray-50 text-gray-800 py-6"
        >
          {gameText.tryAgain}
        </Button>
        <Button 
          variant="default" 
          className="w-full bg-gradient-to-br from-blue-500 to-secondary hover:from-blue-400 hover:to-secondary/90 text-white py-6"
          onClick={() => window.location.href = '/leaderboard'}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          {gameText.viewLeaderboard}
        </Button>
      </div>
    </div>
  );
};

export default GameResultDisplay;
