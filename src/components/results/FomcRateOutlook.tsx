
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

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
        return <ChevronDown className="text-direction-down" />;
      case 'hold':
        return <ChevronRight className="text-direction-neutral" />;
      case 'hike':
        return <ChevronUp className="text-direction-up" />;
      default:
        return null;
    }
  };

  // Function to get direction color
  const getDirectionColor = (direction: string) => {
    switch(direction) {
      case 'cut':
        return "#dc2626"; // direction-down (red)
      case 'hold':
        return "#3b82f6"; // direction-neutral (blue)
      case 'hike':
        return "#16a34a"; // direction-up (green)
      default:
        return "#64748b"; // gray
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
    color: getDirectionColor(item.name),
    directionKey: item.name
  }));

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-2">Clients' Predictions for the Next Fed Move</h2>
      
      <div className="flex-grow mt-4">
        <ChartContainer
          className="w-full aspect-video h-64"
          config={{
            cut: { theme: { dark: "#dc2626", light: "#dc2626" } },
            hold: { theme: { dark: "#3b82f6", light: "#3b82f6" } }, 
            hike: { theme: { dark: "#16a34a", light: "#16a34a" } },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                className="fill-[var(--color-bg)]"
                label={{ position: 'top', fill: '#ffffff', fontSize: 12 }}
                isAnimationActive={true}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(0)}%`,
                      formatDirection(name.toLowerCase())
                    ]}
                    nameKey="directionKey"
                  />
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-400">You predicted:</span>
          <Badge 
            className={`flex items-center space-x-1 ${
              userVote === 'cut' ? 'bg-direction-down' : 
              userVote === 'hold' ? 'bg-direction-neutral' : 
              'bg-direction-up'
            } pulse-glow`}
          >
            {getDirectionIcon(userVote)}
            <span>{formatDirection(userVote)}</span>
          </Badge>
        </div>
        
        <div className="text-center text-sm">
          <span className="text-gray-400">Client average expected target rate:</span>{" "}
          <span className="text-white font-medium">{averageRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};
