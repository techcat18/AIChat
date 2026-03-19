import { OPENROUTER_API_KEY } from "./config.js";

export async function getAIResponse(messages) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost",
      "X-Title": "AI Chat React"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages
    })
  });

  const data = await res.json();

  return data.choices[0].message.content;
}