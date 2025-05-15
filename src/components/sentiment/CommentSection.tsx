
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
      className="space-y-3 bg-slate-800/60 rounded-xl p-5 border border-slate-700/50 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <MessageSquare className="h-5 w-5 text-sky-400" />
        <label className="block text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">Add Comments (Optional)</label>
      </div>
      
      <p className="text-sm text-slate-400 mb-2">Share your thoughts on future rate movements (up to 200 characters)</p>
      
      <Textarea 
        placeholder="Your thoughts on the future rate path..."
        value={comment}
        onChange={(e) => {
          if (e.target.value.length <= 200) {
            setComment(e.target.value);
          }
        }}
        rows={3}
        className="resize-none bg-slate-900/50 border-slate-700 focus:border-sky-600 focus:ring-sky-600/20 text-base py-3 w-full rounded-lg shadow-inner transition-all duration-200 focus:shadow-sky-500/10"
        maxLength={200}
      />
      
      <div className="flex justify-end">
        <span className={`text-sm ${comment.length > 180 ? 'text-amber-400' : 'text-slate-500'} transition-colors duration-200`}>
          {comment.length}/200
        </span>
      </div>
    </motion.div>
  );
};
