import { lorem } from './base';
import { delay } from '@/utils/utils';
import type { Team } from '@/types/user';
import type { Response } from '@/types/response';

interface MembersRes {
  id: string;
  list: Team[];
}

export function getMembersById(id: string): Promise<Response<MembersRes>> {
  const data: Team[] = [
    {
      id: 'team-001',
      name: 'R&D Department',
      description: 'The R&D department is responsible for developing new products and technologies.',
      members: lorem.array(5, () => ({
        id: lorem.unique.nanoid(),
        username: lorem.texts.name('en')
      }))
    },
    {
      id: 'team-002',
      name: 'Marketing Department',
      description: 'The marketing department is responsible for promoting our products and services.',
      members: lorem.array(8, () => ({
        id: lorem.unique.nanoid(),
        username: lorem.texts.name('en')
      }))
    }
  ];

  return delay(500, () => ({
    code: 200,
    data: {
      id: id + lorem.unique.nanoid(),
      list: data
    }
  }));
}
