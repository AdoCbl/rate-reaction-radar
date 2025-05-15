
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Direction } from './types';
import { MessageSquare } from 'lucide-react';

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
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-sky-400" />
        <label className="block text-base font-medium text-slate-300">Add Comments (Optional)</label>
        <span className={`text-xs ${comment.length > 180 ? 'text-amber-400' : 'text-slate-500'} ml-auto transition-colors duration-200`}>
          {comment.length}/200
        </span>
      </div>
      
      <div className="relative">
        <Textarea 
          placeholder="Your thoughts on the future rate path..."
          value={comment}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              setComment(e.target.value);
            }
          }}
          rows={1}
          className="resize-none bg-slate-800/30 border-slate-700 focus:border-sky-600 
                   focus:ring-sky-600/20 text-base py-2 px-3 w-full rounded-lg shadow-inner transition-all 
                   duration-200 focus:shadow-sky-500/10 placeholder:text-slate-500"
          maxLength={200}
        />
        <div className="absolute left-3 top-2 opacity-40 pointer-events-none">
          <MessageSquare className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </motion.div>
  );
};
