import { IconPlus, IconSearch, IconUserFilled } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import OnlineStatus from './OnlineStatus';
import { Avatar } from '@ui/Avatar';
import Input from '@ui/Input';
import type { ChatItem } from '@/types/chat';
import { formatDate } from '@/utils/date';
import Button from '@/components/ui/Button';

const itemLi = cva(' relative flex cursor-pointer justify-between gap-2 overflow-hidden rounded p-2 transition-colors', {
  variants: {
    active: {
      false: 'dark:hover:bg-neutral/40 hover:bg-neutral/50',
      true: 'bg-primary/10'
    }
  }
});

interface ChatListProps {
  list: ChatItem[];
  activeId?: string;
  className?: string;
  onItemSelect?: (item: ChatItem) => void;
}
export default function ChatList({ className, list, activeId, onItemSelect }: ChatListProps) {
  return (
    <div className={cn('border-line bg-background flex h-[calc(100vh_-_96px)] flex-col overflow-hidden rounded-md border px-0 py-2', className)}>
      <div className="mx-2 flex gap-2 py-1">
        <Input size="sm" suffix={<IconSearch size={18} />} className="flex-1" />
        <Button asIcon size="sm" variant="bordered" colors="neutral">
          <IconPlus size={16} />
        </Button>
      </div>
      <ul className="mt-3 flex-1 space-y-1 overflow-auto px-2">
        {list.map((item) => (
          <li key={item.chatId} className={itemLi({ active: activeId === item.chatId })} onClick={() => onItemSelect?.(item)}>
            <div className="flex items-center gap-2 text-sm">
              <OnlineStatus isOnline={item.userInfo.isOnline}>
                <Avatar size="sm" src={item.userInfo.avatarUrl} fallback={<IconUserFilled className="text-neutral-400" size={20} />} />
              </OnlineStatus>
              <div className="max-w-50 flex-1 space-y-0.5">
                <p>{item.userInfo.name}</p>
                <p className="text-description truncate text-xs">{item.content.at(-1)?.content}</p>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <p className="text-description text-xs whitespace-nowrap">{formatDate(parseInt(item.content.at(-1)?.sendTime || ''), { formatStr: 'MM/dd HH:mm:ss' })}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
