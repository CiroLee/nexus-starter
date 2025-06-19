export interface User {
  id: string;
  token: string;
  appKeys: { name: string; key: string }[];
  contact: string;
  email: string;
  country: string;
  username: string;
  avatarUrl: string;
  positionPath: string[];
  role: UserRole;
  bio?: string;
  joinAt: string;
}

type UserRole = 'admin' | 'user';

export interface Team {
  id: string;
  name: string;
  description: string;
  members: {
    id: string;
    username: string;
    avatarUrl?: string;
  }[];
}
