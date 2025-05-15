
import React from 'react';
import { PollForm } from '@/components/sentiment/PollForm';
import { motion } from 'framer-motion';

const SentimentPoll: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Background radial gradient effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/30 to-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.15),transparent_60%)] -z-10 pointer-events-none" />
      
      <PollForm />
    </div>
  );
};

export default SentimentPoll;
