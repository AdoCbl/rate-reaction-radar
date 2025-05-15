
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type SubmitButtonProps = {
  submitted: boolean;
  disabled: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({ submitted, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <Button 
        type="submit" 
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-medium rounded-lg transition-all duration-200 flex items-center justify-center text-base"
        disabled={submitted || disabled}
      >
        {submitted ? "Submitted!" : "Submit Your Forecast"}
      </Button>
    </motion.div>
  );
};
