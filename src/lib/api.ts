export async function getConversations() {
  const res = await fetch("/api/conversations");
  return res.json();
}

export async function getMessages(id: number) {
  const res = await fetch(`/api/messages?id=${id}`);
  return res.json();
}

export async function addMessage(conversationId: number, message: any) {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, message })
  });

  return res.json();
}

export async function getAIResponse(messages: any[]) {
  const res = await fetch("/api/llm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });

  const data = await res.json();
  return data.content;
}
