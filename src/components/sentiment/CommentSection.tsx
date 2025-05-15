
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Direction } from './DirectionButton';

type CommentSectionProps = {
  comment: string;
  setComment: (comment: string) => void;
  direction: Direction | null;
};

export const CommentSection: React.FC<CommentSectionProps> = ({ 
  comment, 
  setComment, 
  direction 
}) => {
  return (
    <motion.div 
      className="space-y-2 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-base font-medium text-gray-300">Comments:</label>
      <Textarea 
        placeholder="Your thoughts on the future rate path..."
        value={comment}
        onChange={(e) => {
          if (e.target.value.length <= 200) {
            setComment(e.target.value);
          }
        }}
        rows={3}
        className="resize-none bg-gray-800/50 border-gray-700 focus:border-sky-600 focus:ring-sky-600/20 text-base py-3 w-full"
        maxLength={200}
      />
      <div className="flex justify-end">
        <span className="text-sm text-gray-500">{comment.length}/200</span>
      </div>
    </motion.div>
  );
};
