export async function POST(req: Request) {
  const { messages } = await req.json();

  const res = await fetch(
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
        messages
      })
    }
  );
  console.log('Result: ', res);
  const data = await res.json();

  return Response.json({
    content: data.choices[0].message.content
  });
}
