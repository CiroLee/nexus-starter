import { lorem } from './base';
import type { Response } from '@/types/response';

export const STATUS = ['active', 'inactive', 'disabled', 'error', 'licensed', 'unlicensed'] as const;
type StatusType = (typeof STATUS)[number];
export interface AppsRes {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: StatusType[];
}
export function getApps(): Promise<Response<AppsRes[]>> {
  const data: AppsRes[] = [
    {
      name: 'Google Drive',
      id: 'google-' + lorem.unique.nanoid(),
      icon: 'google-drive',
      description: 'Google Drive is a cloud storage service that allows you to store and access your files from anywhere.',
      status: ['active']
    },
    {
      id: 'claude-' + lorem.unique.nanoid(),
      name: 'Claude AI',
      icon: 'claude-ai',
      description: 'Claude AI is a large language model developed by Anthropic, which provides a conversational interface for users to interact with.',
      status: ['licensed', 'active']
    },
    {
      id: 'figma' + lorem.unique.nanoid(),
      name: 'Figma',
      icon: 'figma',
      description: 'Figma is a cloud-based design tool that allows you to create, share, and collaborate on designs.',
      status: ['licensed', 'active']
    },
    {
      id: 'photoshop' + lorem.unique.nanoid(),
      name: 'Photoshop',
      icon: 'photoshop',
      description: 'Photoshop is a popular image editing software used by designers and photographers.',
      status: ['unlicensed', 'inactive']
    }
  ];

  return Promise.resolve({
    code: 200,
    data
  });
}
