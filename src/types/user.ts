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

export interface StaffItem {
  id: string;
  username: string;
  avatarUrl?: string;
  position: string;
  startDate: Date;
  serviceTime: number; // month
  salary: number;
  status: 'employed' | 'resigned';
  sex?: 'male' | 'female';
  contact?: 'full-time' | 'part-time' | 'internship';
  positionLevel?: number;
  corpEmail?: string;
}
