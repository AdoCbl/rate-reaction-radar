
import React from 'react';
import { motion } from 'framer-motion';

export const FormHeader: React.FC = () => {
  return (
    <div className="mb-10 text-center">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Sentiment Poll
      </motion.h1>
      
      <motion.p 
        className="text-base md:text-lg text-slate-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Provide your short-term prediction and long-term rate projections.
      </motion.p>
    </div>
  );
};
