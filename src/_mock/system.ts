import { delay } from '@/utils/utils';
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
      id: 'calendar',
      label: 'calendar',
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
