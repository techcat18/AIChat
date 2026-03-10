class ChatMessage extends HTMLElement {
  connectedCallback() {
    const sender = this.getAttribute("sender");

    const wrapper = document.createElement("div");

    wrapper.className =
      sender === "user"
        ? "flex justify-end"
        : "flex justify-start";

    const bubble = document.createElement("div");

    bubble.className =
      sender === "user"
        ? "bg-blue-500 text-white px-4 py-2 rounded-lg max-w-md"
        : "bg-gray-300 text-black px-4 py-2 rounded-lg max-w-md";

    bubble.innerHTML = this.innerHTML;

    wrapper.appendChild(bubble);

    this.innerHTML = "";
    this.appendChild(wrapper);
  }
}

customElements.define("chat-message", ChatMessage);