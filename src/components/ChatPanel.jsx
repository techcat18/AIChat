import Message from "./Message";
import ChatInput from "./ChatInput";

export default function ChatPanel({ messages, onSend, loading }) {
  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <Message key={i} message={m} />
        ))}

        {loading && <div className="text-gray-500">AI is typing...</div>}
      </div>

      <ChatInput onSend={onSend} />
    </main>
  );
}