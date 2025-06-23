import { lorem } from './base';
import { delay } from '@/utils/utils';
import type { Team } from '@/types/user';
import type { Response } from '@/types/response';
import { StaffItem } from '@/types/member';
import { positionOptions } from '@/utils/constants';

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

export function getStaffList() {
  const positions = positionOptions.map((p) => p.label);
  const data: StaffItem[] = lorem.array<StaffItem>(100, () => ({
    id: lorem.texts.string({ range: 8, source: '1234567890' }),
    username: lorem.texts.name('en', true),
    avatarUrl: lorem.image.picsum({ random: true, width: 100 }),
    startDate: lorem.date.dateTime<Date>({ from: '2020/1/1', to: '2025/12/31', format: false }),
    serviceTime: lorem.number.int([1, 60]),
    salary: lorem.number.int([200, 5000]),
    position: lorem.helper.elements<string>(positions),
    status: lorem.helper.elements<StaffItem['status']>(['employed', 'resigned'])
  }));

  return delay(500, () => ({ code: 200, data }));
}
