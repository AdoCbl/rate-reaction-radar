
import React from 'react';
import { PollForm } from '@/components/sentiment/PollForm';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const SentimentPoll: React.FC = () => {
  return (
    <div className="h-full flex">
      {/* Enhanced dark background with gradient */}
      <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
      
      <motion.div 
        className="w-full max-w-5xl mx-auto px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border border-slate-700/50 shadow-md overflow-hidden">
          <PollForm />
        </Card>
      </motion.div>
    </div>
  );
};

export default SentimentPoll;
