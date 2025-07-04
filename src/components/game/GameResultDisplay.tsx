
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
  const scoreClass = score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-indigo-300' : 'text-red-400';
  
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-indigo-300 mb-4">{gameText.outcomeHeader}</h2>
        <ScenarioDisplay scenario={scenario} hideMetadata={false} />
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-400">Your Prediction</div>
            <Badge 
              variant="outline" 
              className="bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
            >
              Confidence: {confidence}%
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-white text-xl">
                {direction?.charAt(0).toUpperCase() + (direction?.slice(1) || '')}
              </div>
              <div className="text-sm text-slate-400">Fed Response</div>
            </div>
            <div>
              <div className="font-semibold text-white text-xl">
                {yieldEstimate > 0 ? '+' : ''}{yieldEstimate} bps
              </div>
              <div className="text-sm text-slate-400">Yield Change</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-400">Actual Outcome</div>
            <Badge className="bg-slate-600/20 text-slate-300 border-slate-600/50">
              {scenario.date}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className={`font-semibold text-xl ${isDirectionCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                {scenario.fedResponse.charAt(0).toUpperCase() + scenario.fedResponse.slice(1)}
                {isDirectionCorrect ? 
                  <span className="inline-block ml-2 text-emerald-400"><Check size={16} /></span> : 
                  <span className="inline-block ml-2 text-red-400">✗</span>
                }
              </div>
              <div className="text-sm text-slate-400">Fed Response</div>
            </div>
            <div>
              <div className={`font-semibold text-xl ${yieldDifference <= 10 ? 'text-emerald-400' : 'text-red-400'}`}>
                {scenario.yieldChange > 0 ? '+' : ''}{scenario.yieldChange} bps
                {yieldDifference <= 10 ? 
                  <span className="inline-block ml-2 text-emerald-400"><Check size={16} /></span> : 
                  <span className="inline-block ml-2 text-red-400">✗</span>
                }
              </div>
              <div className="text-sm text-slate-400">Yield Change</div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="text-sm text-slate-400 mb-2">Historical Context</div>
        <p className="text-white">{gameText.explanationLine}</p>
        <p className="text-white mt-2">{scenario.context}</p>
      </motion.div>
      
      <motion.div 
        className="flex flex-col items-center p-8 border border-slate-700/50 rounded-xl bg-indigo-900/20 backdrop-blur-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="mb-2 text-base text-indigo-200">Your Score</div>
        <div className={`text-5xl font-bold mb-3 ${scoreClass}`}>{score}</div>
        <div className="text-sm text-slate-400 mb-4">out of 100</div>
        
        {score >= 80 ? (
          <Badge className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border-emerald-500/50">Excellent</Badge>
        ) : score >= 50 ? (
          <Badge className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border-indigo-500/50">Good</Badge>
        ) : (
          <Badge className="px-3 py-1 bg-red-500/20 text-red-300 border-red-500/50">Try Again</Badge>
        )}
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm mb-2">
            <span className={isDirectionCorrect ? "text-emerald-400" : "text-red-400"}>
              Fed Direction: {isDirectionCorrect ? "Correct" : "Incorrect"}
            </span>
            <span className="text-slate-500">•</span>
            <span className={`text-${yieldDifference <= 10 ? "emerald" : "red"}-400`}>
              Yield Estimate: {getYieldAccuracyText(yieldDifference)}
            </span>
          </div>
          <p className="text-sm text-slate-400">
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
          className="w-full border-slate-700 bg-slate-800/30 hover:bg-slate-700 text-white py-6"
        >
          {gameText.tryAgain}
        </Button>
        <Button 
          variant="default" 
          className="w-full bg-gradient-to-br from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white py-6"
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
