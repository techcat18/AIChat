import { prisma } from "@/lib/prisma";

export async function GET() {
  const conversations = await prisma.conversation.findMany({
    orderBy: { id: "desc" }
  });

  return Response.json(conversations);
}

export async function POST(req: Request) {
  const { title } = await req.json();

  const conversation = await prisma.conversation.create({
    data: {
      title: title || "New conversation"
    }
  });

  return Response.json(conversation);
}
