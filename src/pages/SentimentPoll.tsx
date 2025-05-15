
import React from 'react';
import { PollForm } from '@/components/sentiment/PollForm';
import { motion } from 'framer-motion';

const SentimentPoll: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <PollForm />
    </div>
  );
};

export default SentimentPoll;
