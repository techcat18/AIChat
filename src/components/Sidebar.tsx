"use client";

export default function Sidebar({
  conversations,
  activeId,
  onSelect
}: {
  conversations: any[];
  activeId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="w-64 border-r p-4">
      <h2 className="font-bold mb-4">Chats</h2>

      {conversations.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`p-2 cursor-pointer rounded ${
            activeId === c.id ? "bg-gray-200" : ""
          }`}
        >
          {c.title}
        </div>
      ))}
    </div>
  );
}