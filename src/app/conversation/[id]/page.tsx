"use client";

import { useEffect, useState, use } from "react";
import Sidebar from "@/components/Sidebar";
import ChatPanel from "@/components/ChatPanel";

import {
  getConversations,
  getMessages,
  addMessage,
  getAIResponse
} from "@/lib/api";

export default function ConversationPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ✅ unwrap promise here
  const activeId = Number(id);

  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getConversations().then(setConversations);
  }, []);

  useEffect(() => {
    getMessages(activeId).then(setMessages);
  }, [activeId]);

  async function handleSend(text: string) {
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };

    setMessages((prev) => [...prev, userMessage]);
    await addMessage(activeId, userMessage);

    setLoading(true);

    try {
      const updated = [...messages, userMessage];
      const aiText = await getAIResponse(updated);

      const aiMessage = { role: "assistant", content: aiText };

      setMessages((prev) => [...prev, aiMessage]);
      await addMessage(activeId, aiMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={(id) => (window.location.href = `/conversation/${id}`)}
      />

      <ChatPanel
        messages={messages}
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
}