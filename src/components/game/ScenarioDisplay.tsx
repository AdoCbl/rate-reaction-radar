
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScenarioData } from '@/types/game';

interface ScenarioDisplayProps {
  scenario: ScenarioData;
  hideMetadata?: boolean;
}

const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({ scenario, hideMetadata = false }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-3 sm:p-4">
        <h2 className="text-base sm:text-lg font-bold text-primary truncate">
          Historical Market Scenario
        </h2>
        
        <p className="text-xs sm:text-sm leading-snug text-gray-700 mt-1 sm:mt-2">
          {scenario.scenario}
        </p>
        
        {!hideMetadata && (
          <div className="mt-1 sm:mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
            <span className="mb-1 sm:mb-0">{scenario.date}</span>
            <span>{scenario.context}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScenarioDisplay;
