export function addUserMessage(text) {
  const messages = document.getElementById("messages");

  const wrapper = document.createElement("div");
  wrapper.className = "flex justify-end";

  const bubble = document.createElement("div");
  bubble.className =
    "bg-blue-500 text-white px-4 py-2 rounded-lg max-w-md";

  bubble.textContent = text;

  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);

  messages.scrollTop = messages.scrollHeight;
}

export function createAssistantMessage() {
  const messages = document.getElementById("messages");

  const wrapper = document.createElement("div");
  wrapper.className = "flex justify-start";

  const bubble = document.createElement("div");
  bubble.className =
    "bg-gray-300 text-black px-4 py-2 rounded-lg max-w-md";

  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);

  messages.scrollTop = messages.scrollHeight;

  return bubble;
}

export function appendToMessage(element, text) {
  element.textContent += text;
}