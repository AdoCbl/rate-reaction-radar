
import React from 'react';
import { PollForm } from '@/components/sentiment/PollForm';
import { motion } from 'framer-motion';

const SentimentPoll: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-130px)] flex items-center justify-center py-6">
      {/* Enhanced dark background with gradient */}
      <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
      
      <motion.div 
        className="w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="card-container bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
          <PollForm />
        </div>
      </motion.div>
    </div>
  );
};

export default SentimentPoll;
