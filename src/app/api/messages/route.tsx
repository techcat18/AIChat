import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    orderBy: { id: "asc" }
  });

  return Response.json(messages);
}

export async function POST(req: Request) {
  const { conversationId, message } = await req.json();

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId }
  });

  if (!conversation) {
    return Response.json(
      { error: "Conversation does not exist" },
      { status: 400 }
    );
  }

  const saved = await prisma.message.create({
    data: {
      role: message.role,
      content: message.content,
      conversationId
    }
  });

  return Response.json(saved);
}
