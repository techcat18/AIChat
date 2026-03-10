import { OPENROUTER_API_KEY } from "./config.js";

export async function streamChat(messages, onToken) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${OPENROUTER_API_KEY}`,
       "HTTP-Referer": "http://localhost",
       "X-Title": "AI Chat App"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: messages,
        stream: true
      })
    }
  );

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let fullText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;

      const json = line.replace("data:", "").trim();

      if (json === "[DONE]") return fullText;

      try {
        const parsed = JSON.parse(json);

        const delta =
          parsed.choices?.[0]?.delta?.content;

        if (delta) {
          fullText += delta;
          onToken(delta);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  return fullText;
}