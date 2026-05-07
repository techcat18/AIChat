import {
  getMessages,
  getConversationById,
  createMessage
} from "@/lib/db/chat";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = Number(searchParams.get("id"));

  const messages = await getMessages(id);

  return Response.json(messages);
}

export async function POST(req: Request) {
  const { conversationId, message } = await req.json();

  const conversation = await getConversationById(conversationId);

  if (!conversation) {
    return Response.json(
      { error: "Conversation does not exist" },
      { status: 400 }
    );
  }

  const saved = await createMessage(
    conversationId,
    message.role,
    message.content
  );

  return Response.json(saved);
}
