import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../ui/Avatar';
import Heading from '../ui/Heading';
import { Popover } from '../ui/Popover';
import Tag from '../ui/Tag';
import Show from '../ui/Show';
import { Tabs, TabsItem, TabsList, TabsContent } from '../ui/Tabs';
import DynamicTrans from './DynamicTrans';
import React from 'react';
import Empty from './Empty';
import type { Notification as NotificationData, MessageItem, NoticeItem } from '@/types/system';

interface NotificationProps extends React.ComponentProps<typeof Popover> {
  data?: NotificationData;
}
export default function Notification({ trigger, data }: NotificationProps) {
  const tabsList = data ? Object.keys(data) : [];
  const { t } = useTranslation();

  return (
    <Popover className="w-84 origin-top-right" align="end" alignOffset={-44} trigger={trigger}>
      <div className="flex h-9 items-center justify-between px-2">
        <Heading as="h5">{t('common.notifications')}</Heading>
        <p className="text-primary cursor-pointer text-[13px] underline underline-offset-2">{t('common.markAsRead')}</p>
      </div>
      <Tabs defaultValue={tabsList[0]}>
        <TabsList>
          {tabsList.map((item) => (
            <TabsItem className="data-[state=inactive]:text-description flex-1 justify-center text-sm" key={item} value={item}>
              <DynamicTrans prefix="common.">{item}</DynamicTrans>({data?.[item as keyof typeof data].length || 0})
            </TabsItem>
          ))}
        </TabsList>
        <TabsContentWithEmpty isEmpty={!data?.message.length} value={tabsList[0]}>
          {data?.message.map((msg) => <MessageContent key={msg.id} {...msg} />)}
        </TabsContentWithEmpty>
        <TabsContentWithEmpty isEmpty={!data?.message.length} value={tabsList[1]}>
          {data?.notice.map((item) => <NoticeContent key={item.id} {...item} />)}
        </TabsContentWithEmpty>
        <TabsContentWithEmpty isEmpty={!data?.todo.length} value={tabsList[2]}>
          {data?.todo.map((item) => <NoticeContent key={item.id} {...item} />)}
        </TabsContentWithEmpty>
      </Tabs>
    </Popover>
  );
}

function TabsContentWithEmpty({ children, className, isEmpty, ...props }: React.ComponentProps<typeof TabsContent> & { isEmpty?: boolean }) {
  return (
    <TabsContent className={cn('data-[orientation=horizontal]:mt-0', className)} {...props}>
      {!isEmpty ? children : <Empty className="h-40 [&_img]:size-18" description={<p className="text-description text-sm">no message</p>} />}
    </TabsContent>
  );
}

function MessageContent({ avatarUrl, username, content, emphasis, createAt }: MessageItem) {
  return (
    <div className="border-line flex min-h-20 gap-2 py-3 not-last:border-b">
      <Avatar src={avatarUrl} fallback={username.slice(0, 1).toUpperCase()} size="sm" className="object-contain" />
      <div className="text-sm">
        <div className="flex items-center gap-1">
          <p>{username}</p>
          <Show when={emphasis}>
            <strong>{emphasis}</strong>
          </Show>
        </div>
        <div>{content}</div>
        <p className="text-description text-xs">{formatDate(new Date(Number(createAt) * 1000), { formatStr: 'yyyy/MM/dd HH:mm' })}</p>
      </div>
    </div>
  );
}

type TagColors = React.ComponentProps<typeof Tag>['colors'];
function NoticeContent({ title, content, tag, tagLevel = 'low', createAt }: NoticeItem) {
  const tagColors: Record<'low' | 'medium' | 'high', TagColors> = {
    low: 'neutral',
    medium: 'primary',
    high: 'danger'
  };
  return (
    <div className="border-line min-h-20 gap-2 py-3 not-last:border-b">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <Tag size="sm" colors={tagColors[tagLevel]}>
          {tag}
        </Tag>
      </div>
      <p className="mb-0.5 truncate text-sm">{content}</p>
      <p className="text-description text-xs">{formatDate(new Date(Number(createAt) * 1000), { formatStr: 'yyyy/MM/dd HH:mm' })}</p>
    </div>
  );
}
