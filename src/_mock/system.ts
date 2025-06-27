import { delay } from '@/utils/utils';
import type { Response } from '@/types/response';
import { lorem } from './base';
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

interface BulletinItem {
  id: string;
  type?: 'info' | 'notice' | 'event';
  content: string;
  createAt: string;
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
