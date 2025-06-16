export interface User {
  id: string;
  token: string;
  contact: string;
  email: string;
  country: string;
  username: string;
  avatarUrl: string;
  positionPath: string[];
  role: UserRole;
}

type UserRole = 'admin' | 'user';
