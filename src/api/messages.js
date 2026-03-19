const messagesDB = {
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

export function getMessages(conversationId) {
  return Promise.resolve(messagesDB[conversationId] || []);
}

export function addMessage(conversationId, message) {
  if (!messagesDB[conversationId]) {
    messagesDB[conversationId] = [];
  }

  messagesDB[conversationId].push(message);

  return Promise.resolve(message);
}