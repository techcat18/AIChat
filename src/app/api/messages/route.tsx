const messagesDB: Record<number, any[]> = {
  1: [
    { role: "assistant", content: "Where do you want to hike?" },
    { role: "user", content: "Somewhere in the mountains" },
    {
      role: "assistant",
      content: "Nice! I’d recommend the Tatras — great views and trails."
    }
  ],
  2: [
    { role: "assistant", content: "What distance are you training for?" },
    { role: "user", content: "Full Ironman" },
    {
      role: "assistant",
      content: "Awesome. You should focus on endurance and brick workouts."
    }
  ]
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  return Response.json(messagesDB[id] || []);
}

export async function POST(req: Request) {
  const { conversationId, message } = await req.json();

  if (!messagesDB[conversationId]) {
    messagesDB[conversationId] = [];
  }

  messagesDB[conversationId].push(message);

  return Response.json(message);
}