import { lorem } from './base';
import { delay } from '@/utils/utils';
import type { Team } from '@/types/user';
import type { Response } from '@/types/response';
import { StaffItem } from '@/types/user';
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
  const positions = positionOptions.map((p) => p.value);
  const data: StaffItem[] = lorem.array<StaffItem>(100, () => {
    const username = lorem.texts.name('en');
    return {
      id: lorem.texts.string({ range: 8, source: '1234567890' }),
      username,
      avatarUrl: lorem.image.picsum({ random: true, width: 100 }),
      startDate: lorem.date.dateTime<Date>({ from: '2020/1/1', to: '2025/12/31', format: false }),
      serviceTime: lorem.number.int([1, 60]),
      salary: lorem.number.int([200, 5000]),
      position: lorem.helper.elements<string>(positions),
      positionLevel: lorem.number.int([1, 12]),
      role: 'user',
      sex: lorem.helper.elements<StaffItem['sex']>(['male', 'female']),
      contract: lorem.helper.elements<StaffItem['contract']>(['full-time', 'part-time', 'internship']),
      corpEmail: username + '@nexus-starter.com',
      status: lorem.helper.elements<StaffItem['status']>(['employed', 'resigned'])
    };
  });

  return delay(500, () => ({ code: 200, data }));
}

export function getCustomerRegions() {
  const data: { key: string; data: number }[] = [
    { key: 'America', data: 94455 },
    { key: 'Australia', data: 32822 },
    { key: 'France', data: 72345 },
    { key: 'Germany', data: 12345 },
    { key: 'Britain', data: 26916 }
  ];

  return delay(500, () => ({ code: 200, data }));
}
