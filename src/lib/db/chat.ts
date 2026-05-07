import { prisma } from "@/lib/prisma";

export async function getConversations() {
  return prisma.conversation.findMany({
    orderBy: { id: "desc" }
  });
}

export async function createConversation(title?: string) {
  return prisma.conversation.create({
    data: {
      title: title || "New conversation"
    }
  });
}

export async function getConversationById(id: number) {
  return prisma.conversation.findUnique({
    where: { id }
  });
}

export async function getMessages(conversationId: number) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { id: "asc" }
  });
}

export async function createMessage(
  conversationId: number,
  role: string,
  content: string
) {
  return prisma.message.create({
    data: {
      conversationId,
      role,
      content
    }
  });
}
