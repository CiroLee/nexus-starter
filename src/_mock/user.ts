import type { Response } from '@/types/response';
import { delay } from '@/utils/utils';

export interface UserRes {
  id: string;
  userName: string;
  avatarUrl: string;
  role: string;
  positionPath: string[];
}
export function getUser(id: string): Promise<Response<UserRes>> {
  const data: UserRes = {
    id,
    userName: 'Will Smith',
    avatarUrl: 'https://dub.sh/C8TrSJF',
    role: 'admin',
    positionPath: ['R&D', 'Frontend Engineer']
  };

  return delay(500, () => ({ code: 200, data }));
}
