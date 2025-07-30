import { sub } from 'date-fns';
import { delay } from '@/utils/utils';
import { lorem } from './base';
import { emojiAvatars } from './constant';
import type { ChatContent, ChatItem } from '@/types/chat';
import type { Response } from '@/types/response';

export function getChatList(): Promise<Response<ChatItem[]>> {
  function randomContent(): ChatContent {
    const role = lorem.helper.elements<ChatContent['role']>(['my-side', 'other-side']);
    const startTime = lorem.date.timestamp({ from: sub(new Date(), { days: 2 }), to: Date.now(), ms: true });
    const to = parseInt(startTime) + lorem.number.int([1, 10]) * 60 * 1000;
    const sendTime = lorem.date.timestamp({ from: parseInt(startTime), to, ms: true });

    return {
      id: lorem.unique.nanoid(),
      role,
      sendTime,
      content: lorem.texts.sentence({ language: 'en' })
    };
  }
  const data: ChatItem[] = lorem.array(emojiAvatars.length, (l, index) => {
    return {
      chatId: l.unique.nanoid(8),
      userInfo: {
        id: l.unique.nanoid(12),
        name: l.texts.name('en', true),
        avatarUrl: emojiAvatars[index],
        isOnline: l.helper.boolean()
      },
      content: l.array(l.number.int([10, 20]), randomContent).sort((a, b) => parseInt(a.sendTime) - parseInt(b.sendTime))
    };
  });

  return delay(500, () => ({ code: 200, data }));
}
