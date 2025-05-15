
import React from 'react';
import { PollForm } from '@/components/sentiment/PollForm';
import { motion } from 'framer-motion';

const SentimentPoll: React.FC = () => {
  return (
    <div className="h-[calc(100vh-130px)] flex items-center justify-center">
      {/* Enhanced background gradient */}
      <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
      
      <PollForm />
    </div>
  );
};

export default SentimentPoll;
