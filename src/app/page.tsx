"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/conversations")
      .then((res) => res.json())
      .then(setConversations);
  }, []);

  async function createConversation() {
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New chat" }),
    });

    const newConv = await res.json();

    setConversations((prev) => [newConv, ...prev]);
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">AI Chat App</h1>

      <button
        onClick={createConversation}
        className="mt-4 px-3 py-1 border"
      >
        + New conversation
      </button>

      <div className="mt-6 space-y-2">
        {conversations.map((c) => (
          <Link
            key={c.id}
            href={`/conversation/${c.id}`}
            className="block text-blue-500"
          >
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
