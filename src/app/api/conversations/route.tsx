import {
  getConversations,
  createConversation
} from "@/lib/db/chat";

export async function GET() {
  const conversations = await getConversations();

  return Response.json(conversations);
}

export async function POST(req: Request) {
  const { title } = await req.json();

  const conversation = await createConversation(title);

  return Response.json(conversation);
}
