"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SidebarClient({
  conversations,
  activeId
}: any) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: "New conversation"
        })
      });

      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onMutate: async () => {
      setCreating(true);

      await queryClient.cancelQueries({
        queryKey: ["conversations"]
      });

      const previous = queryClient.getQueryData(["conversations"]);

      const temp = {
        id: Date.now(),
        title: "New conversation"
      };

      queryClient.setQueryData(["conversations"], (old: any = []) => [
        temp,
        ...old
      ]);

      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["conversations"],
        context?.previous
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"]
      });
      setCreating(false);
    },
    onSuccess: (data) => {
      router.push(`/conversation/${data.id}`);
    }
  });

  async function createConversation() {
    createMutation.mutate();
  }

  return (
    <div className="w-64 border-r p-4">
      <button
        className="mb-4 px-2 py-1 border"
        onClick={createConversation}
        disabled={creating}
      >
        + New chat
      </button>

      {conversations.map((c: any) => (
        <div
          key={c.id}
          onClick={() =>
            router.push(`/conversation/${c.id}`)
          }
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
