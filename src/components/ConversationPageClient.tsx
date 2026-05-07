"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import SidebarClient from "@/components/SidebarClient";
import ChatPanel from "@/components/ChatPanel";

export default function ConversationPageClient({
  activeId,
  initialConversations
}: any) {
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", activeId],
    queryFn: async () => {
      const res = await fetch(`/api/messages?id=${activeId}`);
      return res.json();
    }
  });

  async function handleSend(text: string) {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text
    };

    await fetch("/api/llm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        conversationId: activeId,
        messages: [...messages, userMessage]
      })
    });

    queryClient.invalidateQueries({
      queryKey: ["messages", activeId]
    });
  }

  return (
    <div className="flex h-screen w-full">
      <SidebarClient
        conversations={initialConversations}
        activeId={activeId}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <ChatPanel
          messages={messages}
          onSend={handleSend}
          loading={false}
        />
      </div>
    </div>
  );
}
