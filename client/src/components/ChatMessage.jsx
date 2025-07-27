export default function ChatMessage({ msg, isSelf }) {
  return (
    <div
      className={`max-w-sm p-3 rounded-xl shadow-sm ${
        isSelf ? 'ml-auto bg-indigo-600 text-white text-right' : 'bg-white text-gray-800'
      }`}
    >
      <div className="text-xs font-semibold opacity-70 mb-1">
        {isSelf ? 'You' : msg.from}
      </div>
      <div>{msg.message}</div>
      <div className="text-[10px] mt-1 opacity-60">{msg.time}</div>
    </div>
  );
}
