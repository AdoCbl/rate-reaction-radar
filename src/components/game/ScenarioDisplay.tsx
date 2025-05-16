
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { historicalScenario } from './gameData';
import { Info } from 'lucide-react';

interface ScenarioDisplayProps {
  hideMetadata?: boolean;
}

const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({ hideMetadata = false }) => {
  const getDifficultyColor = () => {
    switch (historicalScenario.difficultyLevel) {
      case 'Easy': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'Medium': return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-sky-500/20 text-sky-300 border-sky-500/50';
    }
  };

  return (
    <motion.div 
      className="p-6 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-300 flex items-center">
          <Info className="mr-2 text-blue-400" size={20} />
          Historical Market Scenario
        </h2>
        {!hideMetadata && (
          <Badge 
            variant="outline" 
            className={`px-3 py-1 text-sm ${getDifficultyColor()}`}
          >
            {historicalScenario.difficultyLevel}
          </Badge>
        )}
      </div>
      
      <p className="text-lg leading-relaxed text-gray-200">{historicalScenario.scenario}</p>
      
      {!hideMetadata && (
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>{historicalScenario.date}</span>
          <span>{historicalScenario.context}</span>
        </div>
      )}
    </motion.div>
  );
};

export default ScenarioDisplay;
