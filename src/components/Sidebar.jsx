import ConversationItem from "./ConversationItem";

export default function Sidebar({ conversations, activeId, onSelect }) {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <button className="w-full bg-blue-500 p-2 rounded mb-4">
        New Chat
      </button>

      {conversations.map((c) => (
        <ConversationItem
          key={c.id}
          conversation={c}
          active={c.id === activeId}
          onClick={() => onSelect(c.id)}
        />
      ))}
    </aside>
  );
}