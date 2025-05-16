
import React from 'react';
import { PollForm } from '@/components/sentiment/PollForm';
import { motion } from 'framer-motion';

const SentimentPoll: React.FC = () => {
  return (
    <div className="h-full flex items-start justify-center">
      {/* Enhanced dark background with gradient */}
      <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
      
      <motion.div 
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-container bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
          <PollForm />
        </div>
      </motion.div>
    </div>
  );
};

export default SentimentPoll;
