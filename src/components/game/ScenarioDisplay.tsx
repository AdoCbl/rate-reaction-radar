
import React from 'react';
import { motion } from 'framer-motion';
import { historicalScenario } from './gameData';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScenarioDisplayProps {
  hideMetadata?: boolean;
}

const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({ hideMetadata = false }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={`bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-5 ${isMobile ? 'space-y-2' : 'space-y-3'}`}>
        <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-indigo-300`}>
          Historical Market Scenario
        </h2>
        
        <p className={`${isMobile ? 'text-sm' : 'text-base'} leading-relaxed text-gray-200`}>
          {historicalScenario.scenario}
        </p>
        
        {!hideMetadata && (
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <span>{historicalScenario.date}</span>
            <span>{historicalScenario.context}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScenarioDisplay;
