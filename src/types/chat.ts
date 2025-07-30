export interface ChatContent {
  id: string;
  role: 'my-side' | 'other-side';
  content: string;
  sendTime: string;
}

export interface ChatItem {
  chatId: string;
  userInfo: {
    id: string;
    name: string;
    avatarUrl?: string;
    isOnline?: boolean;
  };

  content: ChatContent[];
}
