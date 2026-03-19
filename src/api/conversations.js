const conversations = [
  { id: 1, title: "Hiking Trip" },
  { id: 2, title: "Ironman Plan" }
];

export function getConversations() {
  return Promise.resolve(conversations);
}