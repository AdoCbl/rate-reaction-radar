
import React from 'react';
import { motion } from 'framer-motion';

export const FormHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <motion.h1 
        className="text-3xl font-semibold mb-3 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Your Outlook for the Upcoming FOMC Meeting
      </motion.h1>
      
      <motion.p 
        className="text-base text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Provide your short-term prediction and long-term rate projections.
      </motion.p>
    </div>
  );
};
