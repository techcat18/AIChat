import { createMessage } from "@/lib/db/chat";

export async function POST(req: Request) {
  const { messages, conversationId } = await req.json();

  const lastMessage = messages[messages.length - 1];

  await createMessage(
    conversationId,
    "user",
    lastMessage.content
  );

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
        "HTTP-Referer": "http://localhost",
        "X-Title": "AI Chat Next"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages,
        stream: true
      })
    }
  );

  if (!response.body) {
    return new Response("No stream", { status: 500 });
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let assistantMessage = "";

  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);

        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.replace("data: ", "");

          if (data === "[DONE]") {
            await createMessage(
              conversationId,
              "assistant",
              assistantMessage
            );

            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const token = json.choices?.[0]?.delta?.content || "";

            assistantMessage += token;

            controller.enqueue(
              new TextEncoder().encode(token)
            );
          } catch {
          }
        }
      }

      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache"
    }
  });
}
