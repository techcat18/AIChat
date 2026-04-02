const conversations = [
  { id: 1, title: "Hiking Trip" },
  { id: 2, title: "Ironman Plan" }
];

export async function GET() {
  return Response.json(conversations);
}