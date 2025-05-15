
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type DirectionData = {
  name: string;
  count: number;
  percentage: number;
};

type FomcRateOutlookProps = {
  aggregatedData: DirectionData[];
  userVote: string;
  averageRate: number;
};

export const FomcRateOutlook: React.FC<FomcRateOutlookProps> = ({
  aggregatedData,
  userVote,
  averageRate
}) => {
  // Function to get direction icon
  const getDirectionIcon = (direction: string) => {
    switch(direction) {
      case 'cut':
        return <ChevronDown className="text-emerald-500" />;
      case 'hold':
        return <ChevronRight className="text-slate-400" />;
      case 'hike':
        return <ChevronUp className="text-rose-500" />;
      default:
        return null;
    }
  };

  // Function to get direction color
  const getDirectionColor = (direction: string) => {
    switch(direction) {
      case 'cut':
        return "#10b981"; // Emerald-500 for Cut (green)
      case 'hold':
        return "#94a3b8"; // Slate-400 for Hold (neutral gray)
      case 'hike':
        return "#f43f5e"; // Rose-500 for Hike (red)
      default:
        return "#64748b"; // Slate-500
    }
  };

  // Capitalize first letter
  const formatDirection = (direction: string) => {
    return direction.charAt(0).toUpperCase() + direction.slice(1);
  };

  // Format the data for the chart
  const chartData = aggregatedData.map(item => ({
    name: formatDirection(item.name),
    value: item.percentage,
    fill: getDirectionColor(item.name),
    directionKey: item.name
  }));

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Clients' Predictions for the Next Fed Move</h2>
      
      <div className="flex-grow mt-4">
        <ChartContainer
          className="w-full h-64"
          config={{
            cut: { theme: { dark: "#10b981", light: "#10b981" } },
            hold: { theme: { dark: "#94a3b8", light: "#94a3b8" } }, 
            hike: { theme: { dark: "#f43f5e", light: "#f43f5e" } },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 30, right: 10, left: 10, bottom: 5 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                hide={false} 
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
                ticks={[0, 20, 40, 60, 80, 100]} // Improved spacing
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                fill="fill"
                label={{
                  position: 'top',
                  fill: '#cbd5e1',
                  fontSize: 12,
                  fontWeight: 'bold',
                  offset: 10
                }}
                isAnimationActive={true}
                animationBegin={200}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(15, 23, 42, 0.3)' }}
                content={
                  <ChartTooltipContent
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(0)}%`,
                      formatDirection(name.toLowerCase())
                    ]}
                  />
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="mt-8 space-y-4 border-t border-slate-700/50 pt-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="text-slate-400 text-sm">You predicted:</span>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Badge 
              className={`flex items-center space-x-1 py-2 px-4 text-base ${
                userVote === 'cut' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' : 
                userVote === 'hold' ? 'bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600' : 
                'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700'
              } text-white font-medium shadow-lg`}
            >
              {getDirectionIcon(userVote)}
              <span className="ml-1">{formatDirection(userVote)}</span>
            </Badge>
          </motion.div>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-slate-400 text-sm">Client average expected target rate:</span>{" "}
          <span className="text-indigo-300 font-semibold">{averageRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};
