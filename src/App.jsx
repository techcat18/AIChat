import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";

import { getConversations } from "./api/conversations";
import { getMessages, addMessage } from "./api/messages";
import { getAIResponse } from "./api/llm";

export default function App() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load conversations once
  useEffect(() => {
    getConversations().then(setConversations);
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    getMessages(activeId).then(setMessages);
  }, [activeId]);

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    await addMessage(activeId, userMessage);

    setLoading(true);

    try {
      // IMPORTANT: use updated messages (avoid stale state)
      const updatedMessages = [...messages, userMessage];

      const aiText = await getAIResponse(updatedMessages);

      const aiMessage = {
        role: "assistant",
        content: aiText,
      };

      setMessages((prev) => [...prev, aiMessage]);
      await addMessage(activeId, aiMessage);
    } catch (err) {
      console.error(err);

      const errorMessage = {
        role: "assistant",
        content: "Error: failed to fetch AI response.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  }

  return (
    <div className="h-screen w-screen flex">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
      />

      <ChatPanel
        messages={messages}
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
}