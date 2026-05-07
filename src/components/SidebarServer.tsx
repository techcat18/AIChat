import { getConversations } from "@/lib/db/chat";
import SidebarClient from "./SidebarClient";

export default async function SidebarServer({
  activeId
}: {
  activeId?: number;
}) {
  const conversations = await getConversations();

  return (
    <SidebarClient
      conversations={conversations}
      activeId={activeId}
    />
  );
}
