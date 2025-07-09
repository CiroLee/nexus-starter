import type { OrderItem } from './order';
export interface User {
  id: string;
  token: string;
  appKeys: { name: string; key: string }[];
  contact: string;
  email: string;
  country: string;
  username: string;
  nickname?: string;
  avatarUrl: string;
  positionPath: string[];
  role: UserRole;
  bio?: string;
  joinAt: string;
}

type UserRole = 'admin' | 'user' | 'super-admin';

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
  contract?: 'full-time' | 'part-time' | 'internship';
  positionLevel?: number;
  role?: UserRole;
  corpEmail?: string;
}

export interface CustomerInfo {
  id: string;
  name: string;
  avatarUrl?: string;
  phone: string;
  email?: string;
  wechat?: string;
  address?: string;
  birthday?: string;
  aiTags?: string[];
  sex?: 'male' | 'female';
  memberType?: 'ordinary' | 'vip' | 'corporate'; // 普通会员 | VIP会员 | 企业会员
  status: 'active' | 'forbidden' | 'reviewing' | 'churned'; // 活跃 | 禁用 | 审核中 | 流失
  owner?: string; // 归属负责人
  orders?: OrderItem[];
  createAt: string;
  updateAt?: string;
}
