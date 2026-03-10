const sendButton = document.getElementById("sendButton");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  // user message
  addMessage(text, "user");

  messageInput.value = "";

  // fake AI response
  setTimeout(() => {
    addMessage("AI response placeholder", "ai");
  }, 500);
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});