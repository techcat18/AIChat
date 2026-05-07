"use client";

import { useState } from "react";

export default function ChatPanel({
  messages,
  onSend,
  loading
}: {
  messages: any[];
  onSend: (text: string) => void;
  loading: boolean;
}) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <div className="flex flex-col flex-1 h-full min-h-0">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto min-h-0">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <b>{m.role}:</b> {m.content}
          </div>
        ))}

        {loading && <p>AI is typing...</p>}
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex gap-2 w-full"
      >
        <input
          className="border p-2 flex-1 w-full min-w-0"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />

        <button
          type="submit"
          className="bg-black text-white px-4 shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
}
