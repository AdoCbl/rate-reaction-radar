
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { historicalScenario } from './gameData';
import { Info } from 'lucide-react';

const ScenarioDisplay = () => {
  const getDifficultyColor = () => {
    switch (historicalScenario.difficultyLevel) {
      case 'Easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500';
      case 'Medium': return 'bg-amber-500/20 text-amber-400 border-amber-500';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-sky-500/20 text-sky-400 border-sky-500';
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Info className="mr-2 text-sky-400" size={20} />
          Historical Market Scenario
        </h2>
        <Badge 
          variant="outline" 
          className={`px-3 py-1 text-sm ${getDifficultyColor()}`}
        >
          {historicalScenario.difficultyLevel}
        </Badge>
      </div>
      <motion.div 
        className="p-4 bg-gray-800/60 rounded-lg border border-gray-700 shadow-inner mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-base leading-relaxed text-gray-200">{historicalScenario.scenario}</p>
        
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>{historicalScenario.date}</span>
          <span>{historicalScenario.context}</span>
        </div>
      </motion.div>
    </>
  );
};

export default ScenarioDisplay;
