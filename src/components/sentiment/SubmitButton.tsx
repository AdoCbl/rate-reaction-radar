
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check } from 'lucide-react';

type SubmitButtonProps = {
  submitted: boolean;
  disabled: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({ submitted, disabled }) => {
  const buttonContent = () => {
    if (submitted) {
      return (
        <span className="flex items-center justify-center gap-2">
          <Check className="h-5 w-5" />
          Submitted!
        </span>
      );
    }
    return "Submit Your Forecast";
  };

  const button = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="py-2"
    >
      <Button 
        type="submit" 
        className={`w-full py-6 font-medium rounded-xl transition-all duration-300 shadow-lg text-lg
          ${submitted 
            ? 'bg-emerald-700 hover:bg-emerald-800' 
            : disabled 
              ? 'bg-slate-700 text-slate-300 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white hover:shadow-indigo-700/20 hover:shadow-xl'
          }`}
        disabled={submitted || disabled}
      >
        {buttonContent()}
      </Button>
    </motion.div>
  );

  if (disabled && !submitted) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white">
            <p>Please select a rate direction and add at least one projection point</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};
