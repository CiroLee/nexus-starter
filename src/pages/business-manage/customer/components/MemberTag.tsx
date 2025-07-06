import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { IconBuildingBank, IconStarFilled, IconVip } from '@tabler/icons-react';
import React from 'react';
interface MemberTagProps {
  tag: 'ordinary' | 'vip' | 'corporate';
  text?: React.ReactNode;
  className?: string;
}

const member = cva('inline-flex items-center gap-1 rounded-full border text-xs h-6 p-2', {
  variants: {
    tag: {
      ordinary: 'bg-primary/30 border-primary/80',
      vip: 'bg-warning/30 border-warning/80',
      corporate: 'bg-purple-500/30 border-purple-500/80'
    }
  },
  defaultVariants: {
    tag: 'ordinary'
  }
});

export default function MemberTag({ tag, text, className }: MemberTagProps) {
  const tagIcon = tag === 'ordinary' ? <IconStarFilled size={14} /> : tag === 'vip' ? <IconVip size={14} /> : <IconBuildingBank size={14} />;
  return (
    <div className={cn(member({ tag, className }))}>
      {tagIcon}
      <span>{text}</span>
    </div>
  );
}
