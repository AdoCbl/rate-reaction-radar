
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { historicalScenario } from './gameData';

const ScenarioDisplay = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          Historical Market Scenario
        </h2>
        <Badge variant="outline" className="bg-gray-800/30 text-white border-gray-700">
          {historicalScenario.difficultyLevel}
        </Badge>
      </div>
      <motion.div 
        className="p-4 bg-gray-800/50 rounded-md border border-gray-700 shadow-inner"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-gray-300">{historicalScenario.scenario}</p>
      </motion.div>
    </>
  );
};

export default ScenarioDisplay;
