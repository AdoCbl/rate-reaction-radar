
import React from 'react';
import { PollForm } from '@/components/sentiment/PollForm';
import { motion } from 'framer-motion';

const SentimentPoll: React.FC = () => {
  return (
    <div className="h-full flex">
      {/* Light background with subtle gradient */}
      <div className="fixed inset-0 bg-[var(--color-background)] -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_70%)] -z-10 pointer-events-none" />
      
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-container bg-white border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
          <PollForm />
        </div>
      </motion.div>
    </div>
  );
};

export default SentimentPoll;
