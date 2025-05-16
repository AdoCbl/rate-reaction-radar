import React, { useState } from 'react';
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Legend 
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { format } from 'date-fns';

// Mock historical rate projection data
const historicalData = [
  {
    date: new Date('2024-04-01'),
    y2025: 4.50,
    y2026: 3.75,
    y2027: 3.25,
    longRun: 2.50,
  },
  {
    date: new Date('2024-04-15'),
    y2025: 4.25,
    y2026: 3.75,
    y2027: 3.00,
    longRun: 2.50,
  },
  {
    date: new Date('2024-05-01'),
    y2025: 4.00,
    y2026: 3.50,
    y2027: 3.00,
    longRun: 2.50,
  },
  {
    date: new Date('2024-05-15'),
    y2025: 3.75,
    y2026: 3.25,
    y2027: 2.75,
    longRun: 2.50,
  },
  {
    date: new Date('2024-06-01'),
    y2025: 3.50,
    y2026: 3.00,
    y2027: 2.75,
    longRun: 2.50,
  },
  {
    date: new Date('2024-06-15'),
    y2025: 3.25,
    y2026: 2.75,
    y2027: 2.50,
    longRun: 2.25,
  },
  {
    date: new Date('2024-07-01'),
    y2025: 3.00,
    y2026: 2.75,
    y2027: 2.50,
    longRun: 2.25,
  },
];

// Mock Fed SEP medians for comparison
const fedSepMedians = [
  {
    date: new Date('2024-04-01'),
    y2025: 4.75,
    y2026: 3.50,
    y2027: 3.00,
    longRun: 2.50,
  },
  {
    date: new Date('2024-06-15'),
    y2025: 4.00,
    y2026: 3.25,
    y2027: 2.75,
    longRun: 2.50,
  },
];

const chartConfig = {
  y2025: {
    label: "2025",
    theme: {
      light: "#60a5fa", // Blue for light mode
      dark: "#60a5fa"   // Blue for dark mode
    }
  },
  y2026: {
    label: "2026",
    theme: {
      light: "#a78bfa", // Purple for light mode
      dark: "#a78bfa"   // Purple for dark mode
    }
  },
  y2027: {
    label: "2027",
    theme: {
      light: "#2dd4bf", // Teal for light mode
      dark: "#2dd4bf"   // Teal for dark mode
    }
  },
  longRun: {
    label: "Long Run",
    theme: {
      light: "#fb923c", // Orange for light mode
      dark: "#fb923c"   // Orange for dark mode
    }
  },
};

interface RatePathChartProps {
  showFedMedians: boolean;
}

export const RatePathChart: React.FC<RatePathChartProps> = ({ showFedMedians }) => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  
  // Format rate value as percentage with 2 decimal places
  const formatRate = (value: number) => {
    return `${(value).toFixed(2)}%`;
  };
  
  const getFedMedianForDate = (date: Date, year: keyof typeof chartConfig) => {
    // Find closest Fed SEP release date prior to this date
    const relevantFedData = fedSepMedians
      .filter(d => d.date <= date)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
      
    return relevantFedData?.[year];
  };

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={historicalData}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
          onMouseMove={(data) => {
            if (data.activePayload && data.activePayload[0]) {
              setHoveredDate(new Date(data.activePayload[0].payload.date));
            }
          }}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          
          <XAxis 
            dataKey="date" 
            scale="time" 
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
            stroke="#4b5563" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          
          <YAxis 
            domain={[2, 5]}
            tickFormatter={formatRate}
            stroke="#4b5563"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickCount={7}
          />
          
          <Tooltip content={<CustomTooltip showFedMedians={showFedMedians} />} />
          <Legend content={<CustomLegend />} verticalAlign="top" />
          
          {/* Client median projections */}
          <Line 
            type="monotone" 
            dataKey="y2025" 
            name="2025"
            stroke="var(--color-y2025)" 
            strokeWidth={2}
            dot={{ fill: "var(--color-y2025)", r: 4 }}
            activeDot={{ r: 6, fill: "var(--color-y2025)" }}
          />
          <Line 
            type="monotone" 
            dataKey="y2026"
            name="2026" 
            stroke="var(--color-y2026)" 
            strokeWidth={2}
            dot={{ fill: "var(--color-y2026)", r: 4 }}
            activeDot={{ r: 6, fill: "var(--color-y2026)" }}
          />
          <Line 
            type="monotone" 
            dataKey="y2027" 
            name="2027"
            stroke="var(--color-y2027)" 
            strokeWidth={2}
            dot={{ fill: "var(--color-y2027)", r: 4 }}
            activeDot={{ r: 6, fill: "var(--color-y2027)" }}
          />
          <Line 
            type="monotone" 
            dataKey="longRun"
            name="Long Run" 
            stroke="var(--color-longRun)" 
            strokeWidth={2}
            dot={{ fill: "var(--color-longRun)", r: 4 }}
            activeDot={{ r: 6, fill: "var(--color-longRun)" }}
          />
          
          {/* Fed SEP Medians as dashed lines */}
          {showFedMedians && hoveredDate && Object.keys(chartConfig).map((year) => {
            const fedValue = getFedMedianForDate(hoveredDate, year as keyof typeof chartConfig);
            if (!fedValue) return null;
            
            return (
              <Line 
                key={`fed-${year}`}
                name={`Fed ${chartConfig[year as keyof typeof chartConfig].label}`}
                data={[
                  { date: hoveredDate, [year]: fedValue }
                ]}
                dataKey={year}
                stroke={`var(--color-${year})`}
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={{ 
                  fill: "#fff", 
                  stroke: `var(--color-${year})`,
                  strokeWidth: 2,
                  r: 4 
                }}
              />
            );
          })}
        </LineChart>
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
    color: string;
    payload: {
      date: Date;
      [key: string]: any;
    };
  }>;
  label?: string | number;
  showFedMedians: boolean;
}

const CustomTooltip = ({ active, payload, label, showFedMedians }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;
  
  const date = new Date(label as string);
  
  // Get Fed medians for this date if showing them
  const fedMedians: Record<string, number | undefined> = {};
  if (showFedMedians) {
    Object.keys(chartConfig).forEach((year) => {
      const fedValue = fedSepMedians
        .filter(d => d.date <= date)
        .sort((a, b) => b.date.getTime() - a.date.getTime())[0]?.[year as keyof typeof chartConfig];
        
      if (fedValue) fedMedians[year] = fedValue;
    });
  }
  
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
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-slate-300">{entry.name}:</span>
            </div>
            <span className="text-xs font-medium text-white">{entry.value.toFixed(2)}%</span>
          </div>
        ))}
      </div>
      
      {showFedMedians && Object.keys(fedMedians).length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-700">
          <p className="text-xs font-medium text-white mb-1">Fed SEP Medians:</p>
          <div className="space-y-1">
            {Object.entries(fedMedians).map(([year, value]) => {
              if (!value) return null;
              
              const yearConfig = chartConfig[year as keyof typeof chartConfig];
              const yearLabel = yearConfig?.label || year;
              
              return (
                <div key={year} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 border-2 rounded-full" 
                      style={{ 
                        borderColor: `var(--color-${year})`,
                        backgroundColor: "transparent" 
                      }}
                    />
                    <span className="text-xs text-slate-400">{yearLabel}:</span>
                  </div>
                  <span className="text-xs text-slate-300">{value.toFixed(2)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const CustomLegend: React.FC<any> = (props) => {
  const { payload } = props;
  
  if (!payload) return null;
  
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 pb-1">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-1.5">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-slate-300">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
