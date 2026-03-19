export default function ConversationItem({ conversation, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded cursor-pointer ${
        active ? "bg-gray-700" : "hover:bg-gray-800"
      }`}
    >
      {conversation.title}
    </div>
  );
}