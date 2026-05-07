import { getConversations } from "@/lib/db/chat";

import ConversationPageClient from "@/components/ConversationPageClient";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const conversations = await getConversations();

  return (
    <div className="h-screen flex">
      <ConversationPageClient
        activeId={Number(id)}
        initialConversations={conversations}
      />
    </div>
  );
}
