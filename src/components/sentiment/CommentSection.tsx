
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
      className="space-y-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="h-3 w-3 text-[var(--color-secondary)]" />
        <label className="block text-sm font-medium text-[var(--color-text)]">Add Comments (Optional)</label>
        <span className={`text-xs ${comment.length > 180 ? 'text-amber-400' : 'text-[var(--color-text-muted)]'} ml-auto transition-colors duration-200`}>
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
        rows={2}
        className="resize-none bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-primary)] 
                  focus:ring-[var(--color-primary)]/20 text-sm py-2 px-3 w-full rounded-md shadow-inner transition-all 
                  duration-200 focus:shadow-[var(--color-primary)]/10 placeholder:text-[var(--color-text-muted)]/50"
        maxLength={200}
      />
    </motion.div>
  );
};
