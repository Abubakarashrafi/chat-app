import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatWindow({
  chat,
  userId,
  selectedUser,
  selectedGroup,
  message,
  setMessage,
  sendMessage,
}) {
  const filteredChat = chat.filter((msg) => {
    if (selectedUser)
      return (
        (msg.from === userId && msg.to === selectedUser) ||
        (msg.from === selectedUser && msg.to === userId)
      );
    if (selectedGroup) return msg.to === selectedGroup;
    return false;
  });

  return (
    <div className="flex flex-col flex-1 bg-gray-100">
      <ChatHeader selectedUser={selectedUser} selectedGroup={selectedGroup} />
<pre className="text-xs text-gray-400 bg-white p-2">
  
</pre>
      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-50">
        {filteredChat.length > 0 ? (
          filteredChat.map((msg, i) => (
            <ChatMessage key={i} msg={msg} isSelf={msg.from === userId} />
          ))
        ) : (
          <div className="text-gray-500 text-center mt-8">
            Select a user or group to start chatting
          </div>
        )}
      </div>

      {(selectedUser || selectedGroup) && (
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}
