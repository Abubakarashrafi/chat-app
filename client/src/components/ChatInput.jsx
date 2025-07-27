export default function ChatInput({ message, setMessage, sendMessage }) {
  return (
    <div className="flex items-center p-4 border-t bg-white gap-3">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <button
        onClick={sendMessage}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md"
      >
        Send
      </button>
    </div>
  );
}
