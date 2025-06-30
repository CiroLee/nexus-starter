export interface BulletinItem {
  id: string;
  type?: 'info' | 'notice' | 'event';
  content?: string;
  createAt?: string;
}

export interface MessageItem {
  id: string;
  avatarUrl?: string;
  username: string;
  content: string;
  emphasis?: string;
  createAt: string | number;
}

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  tag?: string;
  tagLevel?: 'low' | 'medium' | 'high';
  createAt: string | number;
}

export interface Notification {
  message: MessageItem[];
  notice: NoticeItem[];
  todo: NoticeItem[];
}
