
import React from 'react';
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid 
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { format } from 'date-fns';

// Mock historical data - represents weekly sentiment around Fed decisions
const historicalData = [
  {
    date: new Date('2024-04-01'),
    cut: 15,
    hold: 65,
    hike: 20,
    userPrediction: 'hold'
  },
  {
    date: new Date('2024-04-15'),
    cut: 18,
    hold: 70,
    hike: 12,
    userPrediction: 'hold'
  },
  {
    date: new Date('2024-05-01'),
    cut: 25,
    hold: 65,
    hike: 10
  },
  {
    date: new Date('2024-05-15'),
    cut: 35,
    hold: 60,
    hike: 5
  },
  {
    date: new Date('2024-06-01'),
    cut: 45,
    hold: 50,
    hike: 5,
    userPrediction: 'cut'
  },
  {
    date: new Date('2024-06-15'),
    cut: 55,
    hold: 40,
    hike: 5
  },
  {
    date: new Date('2024-07-01'),
    cut: 60,
    hold: 35,
    hike: 5
  },
];

const chartConfig = {
  cut: {
    label: "Rate Cut",
    theme: {
      dark: "#10b981", // Green for cut
    }
  },
  hold: {
    label: "Hold",
    theme: {
      dark: "#94a3b8", // Gray for hold
    }
  },
  hike: {
    label: "Rate Hike",
    theme: {
      dark: "#f43f5e", // Red for hike
    }
  }
};

export const FomcOutlookChart = () => {
  const renderUserDots = (data: typeof historicalData) => {
    return data
      .filter(entry => entry.userPrediction)
      .map((entry, index) => {
        const predictionType = entry.userPrediction as keyof typeof chartConfig;
        const yValue = entry[predictionType];
        
        return (
          <circle
            key={index}
            cx={`${index * (100 / (data.length - 1))}%`}
            cy={`${100 - yValue}%`}
            r={4}
            fill="#fff"
            filter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.7))"
            className="pulse-glow"
          />
        );
      });
  };

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={historicalData}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorCut" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-cut)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-cut)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-hold)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-hold)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHike" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-hike)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-hike)" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="date" 
            scale="time" 
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
            stroke="#4b5563" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <YAxis 
            tickFormatter={(value) => `${value}%`}
            stroke="#4b5563"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickCount={5}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area 
            type="monotone" 
            dataKey="cut"
            name="Cut"
            stroke="var(--color-cut)"
            strokeWidth={2}
            fill="url(#colorCut)"
            activeDot={{ r: 6 }}
          />
          <Area 
            type="monotone" 
            dataKey="hold"
            name="Hold"
            stroke="var(--color-hold)"
            strokeWidth={2}
            fill="url(#colorHold)"
            activeDot={{ r: 6 }}
          />
          <Area 
            type="monotone" 
            dataKey="hike" 
            name="Hike"
            stroke="var(--color-hike)"
            strokeWidth={2}
            fill="url(#colorHike)"
            activeDot={{ r: 6 }}
          />
          
          <svg>
            {renderUserDots(historicalData)}
          </svg>
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;
  
  const date = new Date(label as string);
  const userPrediction = historicalData.find(d => 
    d.date.getTime() === date.getTime()
  )?.userPrediction;

  return (
    <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-md shadow-lg">
      <p className="mb-2 font-medium text-white">{format(date, 'MMM d, yyyy')}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.name === 'Cut' 
                  ? '#10b981' // Green for cut
                  : entry.name === 'Hold' 
                    ? '#94a3b8' // Gray for hold
                    : '#f43f5e' // Red for hike
                }}
              />
              <span className="text-xs text-slate-300">{entry.name}:</span>
            </div>
            <span className="text-xs font-medium text-white">{entry.value}%</span>
          </div>
        ))}
      </div>
      
      {userPrediction && (
        <div className="mt-2 pt-2 border-t border-slate-700">
          <div className="text-xs text-indigo-300">
            <span className="font-medium">You predicted:</span> {userPrediction.charAt(0).toUpperCase() + userPrediction.slice(1)}
          </div>
        </div>
      )}
    </div>
  );
};
