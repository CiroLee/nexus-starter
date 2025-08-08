import { useState, useEffect, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DropdownMenu } from 'radix-ui';
import { cn } from '@/lib/utils';
import { IconBellOff, IconDotsVertical, IconMessageForward, IconPhone, IconPinned, IconTrash, IconVideo } from '@tabler/icons-react';
import { Button } from '@ui/Button';
import ToolTip from '@ui/Tooltip';
import { Avatar } from '@ui/Avatar';
import Input from '@ui/Input';
import { useUserStore } from '@/store/user';
import type { ChatContent, ChatItem } from '@/types/chat';
import { formatDate } from '@/utils/date';

interface ChatModalProps {
  className?: string;
  chatData?: ChatItem;
  onSideOpen?: () => void;
}
export default function ChatModal({ className, chatData, onSideOpen }: ChatModalProps) {
  const [data, setData] = useState<ChatItem>();
  const { t } = useTranslation();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { register, reset, watch, handleSubmit } = useForm<{ message: string }>();

  const scrollToBottom = useCallback((id: string) => {
    const lastItem = document.getElementById(id);
    if (lastItem) {
      lastItem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const message = watch('message');
  const handleOnSend: SubmitHandler<{ message: string }> = ({ message }) => {
    const chat: ChatContent = {
      id: nanoid(),
      role: 'my-side',
      sendTime: `${Date.now()}`,
      content: message
    };
    setData((prev) => {
      if (!prev) return;
      return {
        ...prev,
        content: [...prev.content, chat]
      };
    });
    reset();
  };

  useEffect(() => {
    setData(chatData);
  }, [chatData]);

  useEffect(() => {
    if (data?.content.length) {
      const lastId = data.content[data.content.length - 1].id;
      scrollToBottom(lastId);
    }
  }, [data?.content, chatData, scrollToBottom]);
  return (
    <div className={cn('border-line dark:bg-neutral/40 flex h-[calc(100vh_-_96px)] flex-col rounded-md border bg-white/50', className)}>
      <ChatModalHeader userInfo={data?.userInfo} onSideOpen={onSideOpen} />
      <section ref={contentRef} className="flex-1 space-y-2 overflow-auto p-4">
        {data?.content.map((item) => (
          <ChatItem id={item.id} key={item.id} avatarUrl={data.userInfo.avatarUrl} role={item.role} content={item.content} sendTime={item.sendTime} />
        ))}
      </section>
      <form onSubmit={handleSubmit(handleOnSend)}>
        <Input
          autoComplete="off"
          {...register('message', { validate: (value) => value.trim().length > 0 })}
          className="bg-background mx-auto mb-4 w-[calc(100%_-_var(--spacing)*8)] pr-1"
          suffix={
            <Button size="sm" className="min-w-16" type="submit" disabled={!message}>
              {t('actions.send')}
            </Button>
          }
        />
      </form>
    </div>
  );
}

interface ChatItemProps {
  id: string;
  avatarUrl?: string;
  sendTime?: string;
  content?: string;
  role?: 'my-side' | 'other-side';
}
function ChatItem({ avatarUrl, role, sendTime, id, content }: ChatItemProps) {
  const { userInfo } = useUserStore();
  return (
    <div id={id} className={cn('flex gap-2', { 'flex-row-reverse': role === 'my-side' })}>
      <Avatar size="sm" src={role === 'my-side' ? userInfo?.avatarUrl : avatarUrl} />
      <div className={cn('max-w-[55%] space-y-1 text-sm md:max-w-[45%]', { 'justify-end': role === 'my-side' })}>
        <div className={cn('bg-neutral/60 mt-1 rounded p-2', role === 'my-side' ? 'rounded-tr-none' : 'rounded-tl-none')}>{content}</div>
        <p className={cn('text-description text-xs', { 'text-end': role === 'my-side' })}>{formatDate(parseInt(sendTime || ''), { formatStr: 'MM/dd HH:mm:ss' })}</p>
      </div>
    </div>
  );
}

function ChatModalHeader({ userInfo, onSideOpen }: { userInfo?: ChatItem['userInfo']; onSideOpen?: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="border-line bg-background flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-1">
        <Button size="sm" variant="light" colors="neutral" asIcon className="flex md:hidden" onClick={onSideOpen}>
          <IconMessageForward size={20} />
        </Button>
        <div className="flex flex-col">
          <p className="font-semibold">{userInfo?.name}</p>
          <span className={cn('text-xs', userInfo?.isOnline ? 'text-green-500' : 'text-description')}>{userInfo?.isOnline ? t('common.onLine') : t('common.offline')}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <ToolTip
          delayDuration={300}
          trigger={
            <Button size="sm" asIcon variant="bordered" colors="neutral">
              <IconPhone size={16} />
            </Button>
          }>
          {t('chat.audioCall')}
        </ToolTip>
        <ToolTip
          delayDuration={300}
          trigger={
            <Button size="sm" asIcon variant="bordered" colors="neutral">
              <IconVideo size={16} />
            </Button>
          }>
          {t('chat.videoCall')}
        </ToolTip>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button size="sm" variant="bordered" colors="neutral" asIcon>
              <IconDotsVertical size={16} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-menu--content gap-1" sideOffset={10} align="end">
              <DropdownMenu.Item className="dropdown-menu--item">
                <IconPinned size={18} />
                {t('chat.pin')}
              </DropdownMenu.Item>
              <DropdownMenu.Item className="dropdown-menu--item">
                <IconBellOff size={18} />
                {t('chat.muteNotice')}
              </DropdownMenu.Item>
              <DropdownMenu.Item className="dropdown-menu--item text-danger hover:bg-danger transition-colors hover:text-white">
                <IconTrash size={18} />
                {t('chat.deleteChat')}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
