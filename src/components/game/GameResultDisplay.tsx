
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateScore, historicalScenario } from './gameData';
import { Direction } from '@/components/sentiment/types';

interface GameResultDisplayProps {
  direction: Direction | null;
  yieldEstimate: number;
  onReset: () => void;
}

const GameResultDisplay: React.FC<GameResultDisplayProps> = ({
  direction,
  yieldEstimate,
  onReset
}) => {
  const score = calculateScore(direction, yieldEstimate);
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
        <Button onClick={onReset} variant="outline" className="w-full border-gray-700 bg-transparent hover:bg-gray-800 text-white">
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

export default GameResultDisplay;
