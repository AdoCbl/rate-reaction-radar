
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RateSelectProps = {
  currentRate: number;
  selectedRate: number | null;
  onChange: (rate: number) => void;
  direction: 'hike' | 'hold' | 'cut' | null;
};

export const RateSelect: React.FC<RateSelectProps> = ({
  currentRate,
  selectedRate,
  onChange,
  direction,
}) => {
  // Generate rate options based on the selected direction
  const getRateOptions = () => {
    const rates: number[] = [];
    
    if (direction === 'hold') {
      // For hold, only show current rate
      return [currentRate];
    } else if (direction === 'hike') {
      // For hike, show current rate + 0.25% increments up to +1.00%
      for (let i = 0; i <= 4; i++) {
        rates.push(currentRate + (i * 0.25));
      }
    } else if (direction === 'cut') {
      // For cut, show current rate - 0.25% decrements down to -1.00%
      for (let i = 0; i <= 4; i++) {
        rates.push(currentRate - (i * 0.25));
      }
    }
    
    return rates;
  };
  
  const rateOptions = getRateOptions();
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Projected rate level:</label>
      <Select
        disabled={!direction}
        value={selectedRate?.toString() || ''}
        onValueChange={(value) => onChange(parseFloat(value))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select rate" />
        </SelectTrigger>
        <SelectContent>
          {rateOptions.map((rate) => (
            <SelectItem key={rate} value={rate.toString()}>
              {rate.toFixed(2)}%
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
