import { addUserMessage, createAssistantMessage, appendToMessage } from "./chat.js";
import { streamChat } from "./api.js";

const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = [];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  input.value = "";

  addUserMessage(text);

  messages.push({
    role: "user",
    content: text
  });

  const assistantBubble = createAssistantMessage();

  const reply = await streamChat(messages, (token) => {
    appendToMessage(assistantBubble, token);
  });

  messages.push({
    role: "assistant",
    content: reply
  });
});