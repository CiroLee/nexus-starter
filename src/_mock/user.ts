import type { User } from '@/types/user';
import { delay } from '@/utils/utils';

export function getUserInfo() {
  const data: User = {
    id: 'admin-user',
    token: 'ixr9J22Hv5S8wtPy50QscRtt2bgPHeOUhlyPlQuotE',
    appKeys: [
      { name: 'webstorm', key: '8e2f4153-0828-41af-bd8a-ef69818e6214' },
      { name: 'photoshop', key: 'c0a22ae5-be2b-47ff-bf55-8aba91829a9e' }
    ],
    username: 'Will Smith',
    nickname: 'LittlePooh',
    avatarUrl: 'https://nexus-avatars.pages.dev/images/profile/profile-21.jpg',
    role: 'admin',
    contact: '13777887788',
    email: 'will_smith@nexus-starter.com',
    country: 'usa',
    bio: 'I am a frontend engineer, I like to write code.',
    positionPath: ['R&D', 'Frontend Engineer'],
    joinAt: '2021/1/12 10:40:00'
  };

  return delay(1500, () => ({ code: 200, data }));
}
