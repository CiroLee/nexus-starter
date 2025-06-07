import { ProjectStatus } from '@/types/project';
import { lorem } from './base';
import { delay } from '@/utils/utils';
import type { Response } from '@/types/response';

interface UserProjects {
  projectId: string;
  projectName: string;
  projectDesc: string;
  projectStatus: ProjectStatus;
  projectColor: string;
}

interface UserProjectsRes {
  id: string;
  projects: UserProjects[];
}

export function getProjectsByUserId(userId: string): Promise<Response<UserProjectsRes>> {
  const data: UserProjects[] = [
    {
      projectId: lorem.unique.nanoid(),
      projectName: 'Nexus-Starter',
      projectDesc: 'Nexus-Kit is an open-source collection of UI components based on Tailwindcss and Radix-UI. Just Copy and Paste the code to your project.',
      projectStatus: 'developing',
      projectColor: '#ed1046'
    },
    {
      projectId: lorem.unique.nanoid(),
      projectName: 'Tiny-motion',
      projectDesc: 'tiny-motion is a lightweight and easy-to-use motion library for React. It provides a simple API for creating animations and transitions.',
      projectStatus: 'reviewing',
      projectColor: '#f9a825'
    },
    {
      projectId: lorem.unique.nanoid(),
      projectName: 'Tiny-lorem',
      projectDesc: 'tiny-lorem is a lightweight and easy-to-use lorem ipsum generator for React. It provides a simple API for generating lorem ipsum text.',
      projectStatus: 'testing',
      projectColor: '#4caf50'
    },
    {
      projectId: lorem.unique.nanoid(),
      projectName: 'Nexus-Kit',
      projectDesc: 'Nexus-Kit is an open-source collection of UI components based on Tailwindcss and Radix-UI. Just Copy and Paste the code to your project.',
      projectStatus: 'deployed',
      projectColor: '#2196f3'
    },
    {
      projectId: lorem.unique.nanoid(),
      projectName: 'React',
      projectDesc: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.',
      projectStatus: 'completed',
      projectColor: '#5385dd'
    },
    {
      projectId: lorem.unique.nanoid(),
      projectName: 'Radix UI',
      projectDesc: 'Radix UI is a collection of open-source React components that are designed to work together.',
      projectStatus: 'testing',
      projectColor: '#000'
    },
    {
      projectId: lorem.unique.nanoid(),
      projectName: 'Tailwind CSS',
      projectDesc: 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs quickly and efficiently.',
      projectStatus: 'planning',
      projectColor: '#00bcff'
    },
    {
      projectId: lorem.unique.nanoid(),
      projectName: 'Zustand',
      projectDesc: 'zustand is a lightweight, fast, and scalable state management solution for React applications.',
      projectStatus: 'approved',
      projectColor: '#49250e'
    }
  ];

  return delay(500, () => ({
    code: 200,
    msg: 'success',
    data: {
      id: userId,
      projects: data
    }
  }));
}
