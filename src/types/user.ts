export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  positionPath: string[];
  role: UserRole;
}

type UserRole = 'admin' | 'user';
