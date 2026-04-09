"use client";

import { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Sidebar from "@/components/Sidebar";
import ChatPanel from "@/components/ChatPanel";

export default function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const activeId = Number(id);

  const queryClient = useQueryClient();

  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch("/api/conversations");
      return res.json();
    }
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", activeId],
    queryFn: async () => {
      const res = await fetch(`/api/messages?id=${activeId}`);
      return res.json();
    }
  });

  const addMessageMutation = useMutation({
    mutationFn: async (message: any) => {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: activeId, message })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", activeId] });
    }
  });

  async function handleSend(text: string) {
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };

    queryClient.setQueryData(["messages", activeId], (old: any = []) => [
      ...old,
      userMessage
    ]);

    await addMessageMutation.mutateAsync(userMessage);

    const res = await fetch("/api/llm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMessage]
      })
    });

    const data = await res.json();

    const aiMessage = {
      role: "assistant",
      content: data.content
    };

    await addMessageMutation.mutateAsync(aiMessage);
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
        loading={addMessageMutation.isPending}
      />
    </div>
  );
}
