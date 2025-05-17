
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
        return <ChevronRight className="text-gray-400" />;
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
        return "#6b7280"; // Gray-500 for Hold (neutral gray)
      case 'hike':
        return "#ef4444"; // Red-500 for Hike (red)
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
      <h2 className="text-xl font-bold text-primary mb-4 tracking-tight">Clients' Predictions for the Next Fed Move</h2>
      
      <div className="flex-grow mt-4">
        <ChartContainer
          className="w-full h-64"
          config={{
            cut: { theme: { light: "#10b981", dark: "#10b981" } },
            hold: { theme: { light: "#6b7280", dark: "#6b7280" } }, 
            hike: { theme: { light: "#ef4444", dark: "#ef4444" } },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 30, right: 10, left: 10, bottom: 5 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                hide={false} 
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 12 }}
                ticks={[0, 20, 40, 60, 80, 100]} // Improved spacing
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                fill="fill"
                label={{
                  position: 'top',
                  fill: '#4b5563',
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
                cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
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

      <div className="mt-8 space-y-4 border-t border-gray-200 pt-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="text-gray-500 text-sm">You predicted:</span>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Badge 
              className={`flex items-center space-x-1 py-2 px-4 text-base ${
                userVote === 'cut' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' : 
                userVote === 'hold' ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600' : 
                'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700'
              } text-white font-medium shadow-sm`}
            >
              {getDirectionIcon(userVote)}
              <span className="ml-1">{formatDirection(userVote)}</span>
            </Badge>
          </motion.div>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-gray-500 text-sm">Client average expected target rate:</span>{" "}
          <span className="text-primary font-semibold">{averageRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};
