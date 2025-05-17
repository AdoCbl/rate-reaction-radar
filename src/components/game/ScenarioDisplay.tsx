
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
      className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-3 ${isMobile ? 'space-y-1' : 'space-y-2'}`}>
        <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-indigo-300`}>
          Historical Market Scenario
        </h2>
        
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} leading-snug text-gray-200`}>
          {scenario.scenario}
        </p>
        
        {!hideMetadata && (
          <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
            <span>{scenario.date}</span>
            <span>{scenario.context}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScenarioDisplay;
