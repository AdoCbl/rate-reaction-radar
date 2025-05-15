
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
        return <ChevronDown className="text-rose-500" />;
      case 'hold':
        return <ChevronRight className="text-sky-500" />;
      case 'hike':
        return <ChevronUp className="text-emerald-500" />;
      default:
        return null;
    }
  };

  // Function to get direction color
  const getDirectionColor = (direction: string) => {
    switch(direction) {
      case 'cut':
        return "#f43f5e"; // Rose-500
      case 'hold':
        return "#0ea5e9"; // Sky-500
      case 'hike':
        return "#10b981"; // Emerald-500
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
      <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 tracking-tight">Clients' Predictions for the Next Fed Move</h2>
      
      <div className="flex-grow mt-4">
        <ChartContainer
          className="w-full h-64"
          config={{
            cut: { theme: { dark: "#f43f5e", light: "#f43f5e" } },
            hold: { theme: { dark: "#0ea5e9", light: "#0ea5e9" } }, 
            hike: { theme: { dark: "#10b981", light: "#10b981" } },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                hide={false} 
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                fill="fill"
                label={{
                  position: 'top',
                  fill: '#64748b',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
                isAnimationActive={true}
                animationBegin={200}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
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

      <div className="mt-6 space-y-3">
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="text-slate-500 dark:text-slate-400 text-sm">You predicted:</span>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Badge 
              className={`flex items-center space-x-1 py-2 px-4 text-base ${
                userVote === 'cut' ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700' : 
                userVote === 'hold' ? 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700' : 
                'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
              } text-white font-medium shadow-lg`}
            >
              {getDirectionIcon(userVote)}
              <span>{formatDirection(userVote)}</span>
            </Badge>
          </motion.div>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-slate-500 dark:text-slate-400 text-sm">Client average expected target rate:</span>{" "}
          <span className="text-indigo-700 dark:text-indigo-300 font-semibold">{averageRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};
