
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { YearProjection } from './types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine
} from 'recharts';

type ProjectionChartProps = {
  userProjections: YearProjection[];
  onUpdateProjection: (year: string, value: number) => void;
};

// Prepare the data structure required by the chart
const prepareChartData = (userProjections: YearProjection[]) => {
  const historicalData = [
    { year: '2024', clientAverage: 0.0525, sepMedian: 0.0525 },
    { year: '2025', clientAverage: 0.0425, sepMedian: 0.0425 },
    { year: '2026', clientAverage: 0.0375, sepMedian: 0.0350 },
    { year: '2027', clientAverage: 0.0300, sepMedian: 0.0275 },
    { year: 'Long Run', clientAverage: 0.0250, sepMedian: 0.0250 }
  ];

  // Merge with user projections
  return historicalData.map(item => {
    const userValue = userProjections.find(p => p.year === item.year)?.value || null;
    return {
      ...item,
      userValue: userValue
    };
  });
};

export const ProjectionChart: React.FC<ProjectionChartProps> = ({
  userProjections,
  onUpdateProjection
}) => {
  const [showSepMedians, setShowSepMedians] = useState(false);
  const [chartData, setChartData] = useState(prepareChartData(userProjections));
  const [hoverYear, setHoverYear] = useState<string | null>(null);
  
  // Update chart data when user projections change
  useEffect(() => {
    setChartData(prepareChartData(userProjections));
  }, [userProjections]);
  
  // Handle click on chart to set projection
  const handleChartClick = (data: any) => {
    if (!data || !data.activeLabel) return;
    
    const year = data.activeLabel;
    // Don't allow setting 2024 value
    if (year === '2024') return;
    
    // Get the y coordinate of the click and convert to a rate value
    const yAxisDomain = [0.02, 0.06]; // 2% to 6%
    const chartHeight = data.chartHeight;
    const clickY = data.activeCoordinate.y;
    
    // Convert the y-coordinate to a rate value between 2% and 6%
    const relativeY = 1 - (clickY / chartHeight);
    let rateValue = yAxisDomain[0] + relativeY * (yAxisDomain[1] - yAxisDomain[0]);
    
    // Round to nearest 0.25% (0.0025)
    rateValue = Math.round(rateValue * 400) / 400;
    
    // Update the projection
    onUpdateProjection(year, rateValue);
  };
  
  // Format rate as percentage
  const formatRate = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };
  
  // Determine if a year has a user projection set
  const hasUserProjection = (year: string) => {
    return userProjections.some(p => p.year === year && p.value !== null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-sky-400 font-medium">
          Click on chart to set your projections
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-300">SEP Medians</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle size={14} className="text-slate-400" />
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white max-w-xs">
                <p className="text-sm">SEP: Summary of Economic Projections from Federal Reserve participants</p>
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

      <div className="flex-grow relative min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            onClick={handleChartClick}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            
            <XAxis 
              dataKey="year" 
              stroke="#4b5563" 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            
            <YAxis 
              domain={[0.02, 0.06]} // 2% to 6% range
              tickFormatter={formatRate}
              stroke="#4b5563"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickCount={9}
            />
            
            <RechartsTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-800 border border-slate-700 p-3 rounded-md shadow-xl">
                      <p className="font-medium text-slate-200">{label}</p>
                      <div className="mt-2 space-y-1">
                        {payload.map((entry: any, index: number) => {
                          // Skip sepMedian if not showing it
                          if (entry.dataKey === 'sepMedian' && !showSepMedians) return null;
                          
                          // Skip userValue if it's null
                          if (entry.dataKey === 'userValue' && entry.value === null) return null;
                          
                          return (
                            <div key={index} className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-1.5">
                                <div 
                                  className={`w-3 h-3 rounded-full`}
                                  style={{ 
                                    backgroundColor: entry.dataKey === 'userValue' 
                                      ? '#60a5fa' 
                                      : entry.dataKey === 'sepMedian'
                                        ? '#c084fc'
                                        : '#34d399' 
                                  }}
                                />
                                <span className="text-xs text-slate-300">
                                  {entry.dataKey === 'userValue' 
                                    ? 'Your Projection'
                                    : entry.dataKey === 'sepMedian'
                                      ? 'SEP Median'
                                      : 'Client Average'}
                                </span>
                              </div>
                              <span className="text-xs font-medium text-white">
                                {formatRate(entry.value)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* Legend */}
            <Legend 
              verticalAlign="top"
              height={36}
              content={() => (
                <div className="flex justify-center items-center gap-6 pb-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#34d399]" />
                    <span className="text-xs text-slate-300">Client Average</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#60a5fa]" />
                    <span className="text-xs text-slate-300">Your Projection</span>
                  </div>
                  {showSepMedians && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#c084fc]" />
                      <span className="text-xs text-slate-300">SEP Median</span>
                    </div>
                  )}
                </div>
              )}
            />
            
            {/* Client average line */}
            <Line
              type="monotone"
              dataKey="clientAverage"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ r: 4, fill: "#34d399" }}
              activeDot={{ r: 6 }}
            />
            
            {/* SEP median line (dashed) - conditionally rendered */}
            {showSepMedians && (
              <Line
                type="monotone"
                dataKey="sepMedian"
                stroke="#c084fc"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: "#c084fc" }}
                activeDot={{ r: 6 }}
              />
            )}
            
            {/* User projection line */}
            <Line
              type="monotone"
              dataKey="userValue"
              stroke="#60a5fa"
              strokeWidth={3}
              connectNulls={true}
              dot={(props: any) => {
                // Only render dots for years that have user values
                if (props.payload.userValue === null) return null;
                
                return (
                  <motion.circle
                    cx={props.cx}
                    cy={props.cy}
                    r={6}
                    fill="#60a5fa"
                    stroke="#fff"
                    strokeWidth={2}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              }}
              activeDot={{ r: 8, fill: "#60a5fa", stroke: "#fff", strokeWidth: 2 }}
            />
            
            {/* Click target guides - render rectangles for each year to assist in clicking */}
            {chartData.map((entry, index) => {
              // Skip the first year (2024) which shouldn't be clickable
              if (entry.year === '2024') return null;
              
              const isHovered = hoverYear === entry.year;
              const hasValue = hasUserProjection(entry.year);
              
              return (
                <rect
                  key={`click-guide-${index}`}
                  x={`${100 / chartData.length * (index + 0.5)}%`}
                  y="0%"
                  width={`${100 / chartData.length}%`}
                  height="100%"
                  fill="transparent"
                  className={`cursor-pointer ${hasValue ? 'hover:fill-blue-500/5' : 'hover:fill-slate-400/5'}`}
                  onMouseEnter={() => setHoverYear(entry.year)}
                  onMouseLeave={() => setHoverYear(null)}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
