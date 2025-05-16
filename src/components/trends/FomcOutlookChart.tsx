
import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { format } from 'date-fns';
import { ChartContainer } from '@/components/ui/chart';

// Mock historical data - each entry represents a week's worth of sentiment
const historicalData = [
  { 
    date: new Date('2024-04-01'),
    cut: 20,
    hold: 60,
    hike: 20,
  },
  { 
    date: new Date('2024-04-15'),
    cut: 30,
    hold: 55,
    hike: 15,
  },
  { 
    date: new Date('2024-05-01'),
    cut: 45,
    hold: 45,
    hike: 10,
  },
  { 
    date: new Date('2024-05-15'),
    cut: 55,
    hold: 35,
    hike: 10,
  },
  { 
    date: new Date('2024-06-01'),
    cut: 70,
    hold: 25,
    hike: 5,
  },
  { 
    date: new Date('2024-06-15'),
    cut: 75,
    hold: 20,
    hike: 5,
  },
  { 
    date: new Date('2024-07-01'),
    cut: 65,
    hold: 30,
    hike: 5,
  },
];

// Define FOMC meeting dates for reference lines
const fomcMeetings = [
  new Date('2024-05-01'),
  new Date('2024-06-12'),
];

// Chart configuration with both light and dark theme values
const chartConfig = {
  cut: {
    label: "Cut",
    theme: {
      light: "#10b981", // Green for light mode
      dark: "#10b981"   // Green for dark mode
    }
  },
  hold: {
    label: "Hold",
    theme: {
      light: "#94a3b8", // Gray for light mode
      dark: "#94a3b8"   // Gray for dark mode
    }
  },
  hike: {
    label: "Hike",
    theme: {
      light: "#f43f5e", // Red for light mode
      dark: "#f43f5e"   // Red for dark mode
    }
  },
};

export const FomcOutlookChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseMove = (data: any) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setActiveIndex(data.activeTooltipIndex);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  // Format date for X-axis
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM d');
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    
    const date = new Date(label);
    
    return (
      <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-md shadow-lg">
        <p className="mb-2 font-medium text-white">{format(date, 'MMM d, yyyy')}</p>
        
        <div className="space-y-1">
          {/* Display percentages for each outlook */}
          {payload.map((entry: any, index: number) => (
            <div 
              key={index} 
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-slate-300">{entry.name}:</span>
              </div>
              <span className="text-xs font-medium text-white">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={historicalData}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#4b5563" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <YAxis 
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            stroke="#4b5563"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {/* FOMC meeting reference lines */}
          {fomcMeetings.map((date, index) => (
            <ReferenceLine
              key={index}
              x={date}
              stroke="#475569"
              strokeDasharray="3 3"
              label={{
                value: 'FOMC',
                position: 'top',
                fill: '#94a3b8',
                fontSize: 10
              }}
            />
          ))}

          <Area
            type="monotone"
            dataKey="cut"
            name="Cut"
            stackId="1"
            stroke="var(--color-cut)"
            fill="var(--color-cut)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="hold"
            name="Hold"
            stackId="1"
            stroke="var(--color-hold)"
            fill="var(--color-hold)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="hike"
            name="Hike"
            stackId="1"
            stroke="var(--color-hike)"
            fill="var(--color-hike)"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
