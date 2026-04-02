import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">AI Chat App</h1>

      <Link className="text-blue-500 mt-4 block" href="/conversation/1">
        Open Conversation 1
      </Link>
    </div>
  );
}