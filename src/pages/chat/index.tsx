import { useEffect, useState } from 'react';
import { Drawer } from '@ui/Drawer';
import ChatList from './components/ChatList';
import ChatModal from './components/ChatModal';
import { useMobile } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { getChatList } from '@/_mock/chat';
import type { ChatItem } from '@/types/chat';
import Show from '@/components/ui/Show';
export default function ChatPage() {
  const isMobile = useMobile();
  const [chatListDrawerOpen, setChatListDrawerOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatItem>();
  const { data: response, isSuccess } = useQuery({ queryKey: ['chatList'], queryFn: getChatList });

  const handleChatItemSelect = (chatItem: ChatItem) => {
    if (isMobile) {
      setChatListDrawerOpen(false);
    }
    setCurrentChat(chatItem);
  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentChat(response.data[0]);
    }
  }, [isSuccess, response?.data]);
  return (
    <div className="flex gap-4 overflow-hidden">
      <Show
        when={!isMobile}
        fallback={
          <Drawer placement="left" open={chatListDrawerOpen} className="px-2" onOpenChange={setChatListDrawerOpen}>
            <ChatList activeId={currentChat?.chatId} className="h-full border-none p-0" list={response?.data || []} onItemSelect={handleChatItemSelect} />
          </Drawer>
        }>
        <ChatList activeId={currentChat?.chatId} className="" list={response?.data || []} onItemSelect={handleChatItemSelect} />
      </Show>
      <ChatModal className="flex-1 overflow-hidden" chatData={currentChat} onSideOpen={() => setChatListDrawerOpen(true)} />
    </div>
  );
}
