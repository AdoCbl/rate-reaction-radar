
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
      className="w-full"
      whileHover={!disabled && !submitted ? { scale: 1.01, y: -1 } : {}}
    >
      <Button 
        type="submit" 
        className={`w-full py-1.5 font-medium rounded-lg transition-all duration-300 shadow-lg
          ${submitted 
            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' 
            : disabled 
              ? 'bg-slate-700 text-slate-300 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-br from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white hover:shadow-sky-500/20 hover:shadow-lg'
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
