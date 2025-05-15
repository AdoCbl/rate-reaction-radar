
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
      className="space-y-1 bg-slate-800/50 rounded-xl p-2 border border-slate-700/40 shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-sky-400" />
        <label className="block text-sm font-medium text-slate-300">Add Comments (Optional)</label>
        <span className={`text-xs ${comment.length > 180 ? 'text-amber-400' : 'text-slate-500'} ml-auto transition-colors duration-200`}>
          {comment.length}/200
        </span>
      </div>
      
      <Textarea 
        placeholder="Your thoughts on the future rate path..."
        value={comment}
        onChange={(e) => {
          if (e.target.value.length <= 200) {
            setComment(e.target.value);
          }
        }}
        rows={1}
        className="resize-none bg-slate-900/50 border-slate-700 focus:border-sky-600 focus:ring-sky-600/20 text-sm py-1 w-full rounded-lg shadow-inner transition-all duration-200 focus:shadow-sky-500/10"
        maxLength={200}
      />
    </motion.div>
  );
};
