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

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <b>{m.role}:</b> {m.content}
          </div>
        ))}

        {loading && <p>AI is typing...</p>}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          className="border flex-1 p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-black text-white px-4"
          onClick={() => {
            onSend(text);
            setText("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}