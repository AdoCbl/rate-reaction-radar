
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type AggregatedDotPlotProps = {
  projections: {
    [key: string]: number[];
  };
  userProjections: {
    [key: string]: number;
  };
  medians: {
    [key: string]: number;
  };
};

export const AggregatedDotPlot: React.FC<AggregatedDotPlotProps> = ({
  projections,
  userProjections,
  medians
}) => {
  const [showSepMedians, setShowSepMedians] = useState(false);
  const years = Object.keys(projections);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  
  // SEP median values - using realistic values
  const sepMedians = {
    '2025': 0.0425,
    '2026': 0.0375,
    '2027': 0.0325,
    'Long Run': 0.0250
  };

  // Format rate as percentage
  const formatRateValue = (rate: number): string => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  // Calculate position on the y-axis for rates
  // The visible range is 0% to 6% (0 to 0.06)
  const getPositionFromRate = (rate: number): number => {
    // Set the limits to ensure values stay within the chart boundaries
    const maxRate = 0.06; // 6%
    // Calculate position as a percentage of height (inverted since 0% is at the bottom)
    return 100 - Math.min(100, (rate / maxRate) * 100);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-end mb-2">
        <div className="flex items-center space-x-2 bg-slate-700/30 px-3 py-1 rounded-md border border-slate-600/50">
          <span className="text-sm text-slate-300 font-medium">SEP</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span><Info size={14} className="text-slate-400 inline-block mr-1" /></span>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white text-xs max-w-[200px]">
                <p>Summary of Economic Projections — median forecast from FOMC participants.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Switch 
            checked={showSepMedians}
            onCheckedChange={setShowSepMedians}
            className="data-[state=checked]:bg-indigo-600"
          />
        </div>
      </div>
      
      <div className="flex-grow relative bg-slate-800/40 rounded-md border border-slate-700/50">
        {/* Fixed height container to prevent layout shifts */}
        <div className="h-[240px] relative">
          {/* Y-axis labels - more detailed with 0.25% increments */}
          <div className="absolute left-0 top-0 bottom-0 w-10 pointer-events-none">
            {[6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0].map((value) => (
              <div 
                key={value} 
                className="flex items-center"
                style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: `${getPositionFromRate(value / 100)}%`, 
                  transform: 'translateY(-50%)' 
                }}
              >
                <span className="text-xs text-slate-400 w-8 text-right pr-2">
                  {value}%
                </span>
                <div className="absolute border-t border-slate-700" 
                    style={{left: '8px', width: 'calc(100vw - 16px)'}}></div>
              </div>
            ))}
          </div>
          
          {/* Dot plots for each year */}
          <div className="flex justify-between w-full pl-10 space-x-3 h-full">
            {years.map((year) => (
              <div 
                key={year} 
                className="flex flex-col items-center flex-1 h-full"
                onMouseEnter={() => setHoveredYear(year)}
                onMouseLeave={() => setHoveredYear(null)}
              >
                <span className={`text-sm font-medium ${hoveredYear === year ? 'text-white' : 'text-slate-300'} mb-1 transition-colors`}>
                  {year}
                </span>
                
                <div className={`relative h-full w-full max-w-16 ${hoveredYear === year ? 'bg-slate-700/40' : 'bg-slate-800/40'} transition-all duration-200`}>
                  {/* Client dots */}
                  {projections[year].map((value, index) => {
                    const position = getPositionFromRate(value);
                    const isUserDot = Math.abs(userProjections[year] - value) < 0.0001;
                    const jitterX = isUserDot ? 0 : (index % 5) - 2; // Add some horizontal jitter
                    
                    return (
                      <TooltipProvider key={`${year}-${index}-${value}`}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              className={`absolute rounded-full ${isUserDot ? 
                                'w-4 h-4 bg-blue-500 ring-2 ring-blue-300/30 shadow-lg shadow-blue-500/30 z-10 pulse-glow' : 
                                'w-2 h-2 bg-sky-400/70'
                              }`}
                              style={{ 
                                left: `calc(50% + ${jitterX}px)`,
                                top: `${position}%`,
                                transform: 'translate(-50%, -50%)'
                              }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                duration: 0.4, 
                                delay: isUserDot ? 0.6 : 0.2 + (index * 0.05) 
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white">
                            <div className="text-xs">
                              {isUserDot ? (
                                <span className="font-medium text-blue-300">Your projection: </span>
                              ) : (
                                <span className="font-medium text-sky-400">Client projection: </span>
                              )}
                              <span>{formatRateValue(value)}</span>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                  
                  {/* SEP median line - Using AnimatePresence to control visibility without layout shift */}
                  <AnimatePresence initial={false}>
                    {showSepMedians && sepMedians[year as keyof typeof sepMedians] && (
                      <motion.div
                        className="absolute w-10 h-[2px] bg-purple-400 left-1/2 transform -translate-x-1/2"
                        style={{ 
                          top: `${getPositionFromRate(sepMedians[year as keyof typeof sepMedians])}%`
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.7 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Client Median Projections */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-medium text-indigo-300">Client Median Projections</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={14} className="text-slate-400" />
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white text-xs">
                <p>Median rate projection values from all client forecasts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Separator className="mb-3" />
        
        <div className="grid grid-cols-4 gap-3 bg-slate-800/60 rounded-md p-2 border border-slate-700/50">
          {years.map((year) => (
            <div key={year} className="text-center">
              <span className="text-sm font-medium text-slate-300 block">{year}</span>
              <span className="text-base text-blue-400 font-semibold block mt-1">
                {formatRateValue(medians[year])}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Info text - Using fixed height and AnimatePresence to prevent layout shifts */}
      <div className="h-8 mt-2">
        <AnimatePresence initial={false} mode="wait">
          {showSepMedians && (
            <motion.div 
              className="text-xs text-slate-400 bg-slate-800/70 p-2 rounded-md border border-slate-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p>Latest FOMC SEP median values shown in purple.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
