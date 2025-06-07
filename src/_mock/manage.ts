import { lorem } from './base';
import { delay } from '@/utils/utils';
import type { Response } from '@/types/response';

export const STATUS = ['active', 'inactive', 'disabled', 'error', 'licensed', 'unlicensed'] as const;
export const APP_TYPE = ['software', 'ai', 'design', 'development', 'google'];
type StatusType = (typeof STATUS)[number];
type AppType = (typeof APP_TYPE)[number];
export interface AppsRes {
  id: string;
  name: string;
  icon: string;
  type?: AppType[];
  description: string;
  status: StatusType[];
}
export function getApps(): Promise<Response<AppsRes[]>> {
  const data: AppsRes[] = [
    {
      name: 'Google Drive',
      id: 'google-' + lorem.unique.nanoid(),
      icon: 'google-drive',
      type: ['google'],
      description: 'Google Drive is a cloud storage service that allows you to store and access your files from anywhere.',
      status: ['active']
    },
    {
      id: 'claude-' + lorem.unique.nanoid(),
      name: 'Claude AI',
      icon: 'claude-ai',
      type: ['ai'],
      description: 'Claude AI is a large language model developed by Anthropic, which provides a conversational interface for users to interact with.',
      status: ['licensed', 'active']
    },
    {
      id: 'figma' + lorem.unique.nanoid(),
      name: 'Figma',
      icon: 'figma',
      type: ['design'],
      description: 'Figma is a cloud-based design tool that allows you to create, share, and collaborate on designs.',
      status: ['licensed', 'active']
    },
    {
      id: 'photoshop' + lorem.unique.nanoid(),
      name: 'Photoshop',
      icon: 'photoshop',
      type: ['design'],
      description: 'Photoshop is a popular image editing software used by designers and photographers.',
      status: ['unlicensed', 'inactive']
    },
    {
      id: 'illustrator' + lorem.unique.nanoid(),
      name: 'Illustrator',
      icon: 'illustrator',
      type: ['design'],
      description: 'Illustrator is a vector graphics editor used for creating illustrations and logos.',
      status: ['licensed', 'active']
    },
    {
      id: 'webstorm' + lorem.unique.nanoid(),
      name: 'WebStorm',
      icon: 'webstorm',
      type: ['development'],
      description: 'WebStorm is a powerful IDE for web development, with features like code completion, debugging, and version control.',
      status: ['licensed', 'active']
    },
    {
      id: 'pycharm' + lorem.unique.nanoid(),
      name: 'PyCharm',
      icon: 'pycharm',
      type: ['development'],
      description: 'PyCharm is a powerful IDE for Python development, with features like code completion, debugging, and version control.',
      status: ['licensed', 'active']
    },
    {
      id: 'cursor' + lorem.unique.nanoid(),
      name: 'Cursor',
      icon: 'cursor',
      description: 'Cursor is a powerful IDE for JavaScript development, with features like code completion, debugging, and version control.',
      status: ['licensed', 'active']
    },
    {
      id: 'firebase' + lorem.unique.nanoid(),
      name: 'Firebase',
      icon: 'firebase',
      type: ['google', 'development'],
      description: 'Firebase is a backend-as-a-service platform for building mobile and web apps, with features like real-time databases, authentication, and hosting.',
      status: ['error']
    }
  ];

  return delay(500, () => ({ code: 200, data }));
}
