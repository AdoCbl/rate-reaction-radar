
import React from 'react';
import { Slider } from "@/components/ui/slider";

type ConfidenceSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const ConfidenceSlider: React.FC<ConfidenceSliderProps> = ({ value, onChange }) => {
  // Handle Slider change
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };
  
  // Get confidence text based on value
  const getConfidenceText = () => {
    if (value < 20) return 'Very Low Confidence';
    if (value < 40) return 'Low Confidence';
    if (value < 60) return 'Moderate Confidence';
    if (value < 80) return 'High Confidence';
    return 'Very High Confidence';
  };
  
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <span className="confidence-text">How confident are you in this forecast?</span>
        <span className="confidence-text font-semibold">{value}%</span>
      </div>
      
      <Slider
        min={0}
        max={100}
        step={5}
        value={[value]}
        onValueChange={handleSliderChange}
        className="py-4"
      />
      
      <div className="text-center">
        <span className="confidence-text font-medium text-primary">{getConfidenceText()}</span>
      </div>
    </div>
  );
};
