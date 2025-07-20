import { delay } from '@/utils/utils';
import { lorem } from './base';
import type { BulletinItem, Notification } from '@/types/system';
import type { Response } from '@/types/response';

interface QuickAccessItem {
  id: string;
  label: string;
  icon: string;
  url: string;
}

interface QuickAccessRes {
  id: string;
  list: QuickAccessItem[];
}
export function getQuickAccessById(userId: string): Promise<Response<QuickAccessRes>> {
  const data: QuickAccessItem[] = [
    {
      id: 'file',
      label: 'file',
      icon: 'file',
      url: '#'
    },
    {
      id: 'logs',
      label: 'logs',
      icon: 'logs',
      url: '#'
    },
    {
      id: 'mail',
      label: 'mail',
      icon: 'mail',
      url: '#'
    },
    {
      id: 'schedule',
      label: 'schedule',
      icon: 'calendar',
      url: '#'
    },
    {
      id: 'reports',
      label: 'report',
      icon: 'chart-bar',
      url: '#'
    },
    {
      id: 'task',
      label: 'task',
      icon: 'checklist',
      url: '#'
    }
  ];

  return delay(500, () => ({ code: 200, data: { id: userId, list: data } }));
}

export function getBulletins(): Promise<Response<BulletinItem[]>> {
  const data = lorem.array<BulletinItem>(6, (l) => ({
    id: l.unique.nanoid(),
    type: l.helper.elements<BulletinItem['type']>(['info', 'notice', 'event']),
    createAt: l.date.timestamp({ from: '2024/12/1', to: '2025/12/31' }),
    content: l.texts.paragraph()
  }));

  return delay(500, () => ({ code: 200, data }));
}

export function getNotifications(): Promise<Response<Notification>> {
  const data: Notification = {
    message: [
      {
        id: lorem.unique.nanoid(),
        username: 'Wing Lisa',
        content: 'commented on your issue(#12342)',
        createAt: '1743830609'
      },
      {
        id: lorem.unique.nanoid(),
        username: 'John Doe',
        avatarUrl: 'https://nexus-avatars.netlify.app/assets/profile-34-Cg4Ofcsk.jpg',
        content: 'request has been sent, please approve',
        emphasis: 'reply to you',
        createAt: '1743912732'
      },
      {
        id: lorem.unique.nanoid(),
        username: 'Dan',
        avatarUrl: 'https://nexus-avatars.netlify.app/assets/profile-11-DyEkD0HJ.jpg',
        content: ' fixed all bugs, please check',
        emphasis: 'mention you',
        createAt: '1743921281'
      }
    ],
    notice: [
      {
        id: lorem.unique.nanoid(),
        title: 'Expired notice',
        content: 'Your webstorm license has been expired, please contact the administrator to renew it.',
        tag: 'Expired',
        tagLevel: 'high',
        createAt: '1743912732'
      },
      {
        id: lorem.unique.nanoid(),
        title: 'Activate notice',
        content: 'Your virtual wallet function has been activated.',
        tag: 'Activated',
        tagLevel: 'low',
        createAt: '1743921281'
      }
    ],
    todo: []
  };

  return delay(500, () => ({ code: 200, data }));
}
