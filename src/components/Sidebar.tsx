"use client";

import { useRouter } from "next/navigation";

export default function Sidebar({
  conversations,
  activeId,
  onCreate
}: any) {
  const router = useRouter();

  return (
    <div className="w-64 border-r p-4">
      <button
        className="mb-4 px-2 py-1 border"
        onClick={onCreate}
      >
        + New chat
      </button>

      {conversations.map((c: any) => (
        <div
          key={c.id}
          onClick={() => router.push(`/conversation/${c.id}`)}
          className={`p-2 cursor-pointer ${
            c.id === activeId ? "bg-gray-200" : ""
          }`}
        >
          {c.title}
        </div>
      ))}
    </div>
  );
}
