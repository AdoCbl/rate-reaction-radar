import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceDot 
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { format } from 'date-fns';

// Mock historical data - each entry represents client projections vs Fed SEP for a specific date
const accuracyData = [
  {
    date: new Date('2024-03-20'), // March FOMC
    client2025: 0.0425,
    fed2025: 0.0450,
    client2026: 0.0375,
    fed2026: 0.0400,
    client2027: 0.0325,
    fed2027: 0.0350,
    clientLongRun: 0.0250,
    fedLongRun: 0.0250,
  },
  {
    date: new Date('2024-04-15'),
    client2025: 0.0400,
    fed2025: 0.0450, // From March SEP
    client2026: 0.0350,
    fed2026: 0.0400, // From March SEP
    client2027: 0.0300,
    fed2027: 0.0350, // From March SEP
    clientLongRun: 0.0250,
    fedLongRun: 0.0250, // From March SEP
  },
  {
    date: new Date('2024-05-01'), // May FOMC
    client2025: 0.0375,
    fed2025: 0.0450, // Still using March SEP
    client2026: 0.0325,
    fed2026: 0.0400, // Still using March SEP
    client2027: 0.0300,
    fed2027: 0.0350, // Still using March SEP
    clientLongRun: 0.0250,
    fedLongRun: 0.0250, // Still using March SEP
  },
  {
    date: new Date('2024-06-12'), // June FOMC with new SEP
    client2025: 0.0350,
    fed2025: 0.0400, // Updated June SEP
    client2026: 0.0300,
    fed2026: 0.0350, // Updated June SEP
    client2027: 0.0275,
    fed2027: 0.0325, // Updated June SEP
    clientLongRun: 0.0225,
    fedLongRun: 0.0250, // Updated June SEP
  },
];

// Chart configuration with both light and dark theme values
const chartConfig = {
  client2025: {
    label: "2025 Client",
    theme: {
      light: "#60a5fa", // Blue for client
      dark: "#60a5fa"   // Blue for client
    }
  },
  fed2025: {
    label: "2025 Fed",
    theme: {
      light: "#9b87f5", // Purple for Fed
      dark: "#9b87f5"   // Purple for Fed
    }
  },
  client2026: {
    label: "2026 Client",
    theme: {
      light: "#a78bfa", // Purple for client
      dark: "#a78bfa"   // Purple for client
    }
  },
  fed2026: {
    label: "2026 Fed",
    theme: {
      light: "#c4b5fd", // Light purple for Fed
      dark: "#c4b5fd"   // Light purple for Fed
    }
  },
  client2027: {
    label: "2027 Client",
    theme: {
      light: "#2dd4bf", // Teal for client
      dark: "#2dd4bf"   // Teal for client
    }
  },
  fed2027: {
    label: "2027 Fed",
    theme: {
      light: "#8b5cf6", // Vivid purple for Fed
      dark: "#8b5cf6"   // Vivid purple for Fed
    }
  },
  clientLongRun: {
    label: "Long Run Client",
    theme: {
      light: "#fb923c", // Orange for client
      dark: "#fb923c"   // Orange for client
    }
  },
  fedLongRun: {
    label: "Long Run Fed",
    theme: {
      light: "#e879f9", // Pink for Fed
      dark: "#e879f9"   // Pink for Fed
    }
  },
};

type YearOption = '2025' | '2026' | '2027' | 'Long Run';

export const ForecastAccuracyChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<YearOption>('2025');
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  
  // Format rate value as percentage with 2 decimal places
  const formatRate = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Filter data keys based on selected year
  const getKeysByYear = (year: YearOption): { client: string; fed: string } => {
    if (year === 'Long Run') {
      return { client: 'clientLongRun', fed: 'fedLongRun' };
    }
    return { 
      client: `client${year}`, 
      fed: `fed${year}` 
    };
  };

  const keys = getKeysByYear(selectedYear);
  
  // Check if there's a significant divergence (>50bps) between client and Fed
  const hasDivergence = (data: typeof accuracyData[0]): boolean => {
    const clientKey = keys.client as keyof typeof data;
    const fedKey = keys.fed as keyof typeof data;
    return Math.abs(Number(data[clientKey]) - Number(data[fedKey])) > 0.005; // 50bps = 0.005
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-300">Select projection year:</div>
        <div className="flex items-center space-x-2">
          {(['2025', '2026', '2027', 'Long Run'] as YearOption[]).map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedYear === year 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 p-4 rounded-md shadow-inner">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={accuracyData}
              margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
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
                scale="linear"
                tickSize={5}
              />
              
              <Tooltip content={<CustomAccuracyTooltip selectedYear={selectedYear} />} />
              
              <Legend content={<CustomLegend />} />
              
              {/* Client Projection Line */}
              <Line
                type="monotone"
                dataKey={keys.client}
                name={`${selectedYear} Client`}
                stroke={`var(--color-${keys.client})`}
                strokeWidth={2}
                dot={{ fill: `var(--color-${keys.client})`, r: 4 }}
                activeDot={{ r: 6, fill: `var(--color-${keys.client})` }}
              />
              
              {/* Fed SEP Median Line - dashed */}
              <Line
                type="monotone"
                dataKey={keys.fed}
                name={`${selectedYear} Fed`}
                stroke={`var(--color-${keys.fed})`}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ 
                  fill: "#fff", 
                  stroke: `var(--color-${keys.fed})`,
                  strokeWidth: 2,
                  r: 4 
                }}
                activeDot={{ 
                  r: 6, 
                  fill: "#fff", 
                  stroke: `var(--color-${keys.fed})`,
                  strokeWidth: 2
                }}
              />
              
              {/* Highlight points with significant divergence */}
              {accuracyData
                .filter(hasDivergence)
                .map((entry, index) => {
                  const clientKey = keys.client as keyof typeof entry;
                  // Convert Date object to a string for ReferenceDot
                  const dateValue = entry.date.toISOString();
                  
                  return (
                    <ReferenceDot
                      key={`divergence-${index}`}
                      x={dateValue}
                      y={entry[clientKey] as number}
                      r={8}
                      fill="transparent"
                      stroke="#f43f5e" // Rose color to highlight divergence
                      strokeWidth={2}
                      strokeOpacity={0.8}
                    />
                  );
                })
              }
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="flex items-center justify-center gap-6 py-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-xs text-slate-300">Client Forecast</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 bg-purple-400 rounded-full"></div>
          <span className="text-xs text-slate-300">Fed SEP Median</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border-2 border-rose-500 bg-transparent"></div>
          <span className="text-xs text-slate-300">Divergence (&gt;50bps)</span>
        </div>
      </div>
      
      <p className="text-sm text-slate-400 text-center mt-2">
        This comparison helps track how closely client sentiment aligned with Fed guidance over time.
      </p>
    </div>
  );
};

interface CustomAccuracyTooltipProps {
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
  selectedYear: YearOption;
}

const CustomAccuracyTooltip = ({ active, payload, label, selectedYear }: CustomAccuracyTooltipProps) => {
  if (!active || !payload || !payload.length) return null;
  
  const date = new Date(label as string);
  
  // Extract client and Fed values
  let clientValue = 0;
  let fedValue = 0;
  let difference = 0;
  let clientColor = '';
  let fedColor = '';
  
  payload.forEach(entry => {
    if (entry.dataKey.includes('client')) {
      clientValue = entry.value;
      clientColor = entry.color;
    } else if (entry.dataKey.includes('fed')) {
      fedValue = entry.value;
      fedColor = entry.color;
    }
  });
  
  // Calculate difference
  difference = clientValue - fedValue;
  const formattedDifference = (difference * 100).toFixed(2); // Convert to basis points
  const isSignificantDifference = Math.abs(difference) > 0.005; // > 50bps
  
  return (
    <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-md shadow-lg">
      <p className="mb-2 font-medium text-white">{format(date, 'MMM d, yyyy')}</p>
      
      <div className="space-y-1.5">
        {/* Client value */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: clientColor }}
            />
            <span className="text-xs text-slate-300">Client:</span>
          </div>
          <span className="text-xs font-medium text-white">{(clientValue * 100).toFixed(2)}%</span>
        </div>
        
        {/* Fed value */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3 border-2 rounded-full" 
              style={{ borderColor: fedColor, backgroundColor: 'transparent' }}
            />
            <span className="text-xs text-slate-300">Fed SEP:</span>
          </div>
          <span className="text-xs font-medium text-white">{(fedValue * 100).toFixed(2)}%</span>
        </div>
      </div>
      
      {/* Difference */}
      <div className="mt-2 pt-2 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300">Difference:</span>
          <span className={`text-xs font-medium ${
            isSignificantDifference 
              ? (difference > 0 ? 'text-rose-400' : 'text-emerald-400') 
              : 'text-slate-300'
          }`}>
            {difference > 0 ? '+' : ''}{formattedDifference}%
          </span>
        </div>
      </div>
    </div>
  );
};

const CustomLegend: React.FC<any> = (props) => {
  const { payload } = props;
  
  if (!payload) return null;
  
  // Group the legend items by year (removing "Client" or "Fed" suffix)
  const groupedItems: Record<string, {client: any, fed: any}> = {};
  
  payload.forEach((entry: any) => {
    const nameComponents = entry.value.split(' ');
    const year = nameComponents[0];
    const type = nameComponents[1].toLowerCase();
    
    if (!groupedItems[year]) {
      groupedItems[year] = { client: null, fed: null };
    }
    
    groupedItems[year][type as 'client' | 'fed'] = entry;
  });
  
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pb-2">
      {Object.entries(groupedItems).map(([year, items]) => (
        <div key={year} className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: items.client?.color }}
            />
            <span className="text-xs text-slate-300">{year}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
