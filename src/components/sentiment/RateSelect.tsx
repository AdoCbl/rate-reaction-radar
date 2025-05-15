
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Select
        disabled={!direction}
        value={selectedRate?.toString() || ''}
        onValueChange={(value) => onChange(parseFloat(value))}
      >
        <SelectTrigger className="w-full bg-gray-800/60 border-gray-700 focus:border-sky-500 focus:ring focus:ring-sky-500/20 text-gray-200">
          <SelectValue placeholder="Select target rate" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
          {rateOptions.map((rate) => (
            <SelectItem key={rate} value={rate.toString()} className="focus:bg-gray-700 focus:text-white">
              {rate.toFixed(2)}%
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
