import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-2 border-t">
      <input
        className="flex-1 border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />

      <button className="bg-blue-500 text-white px-4 rounded">
        Send
      </button>
    </form>
  );
}