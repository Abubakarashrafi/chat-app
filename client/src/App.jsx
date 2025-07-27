import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import useChatSocket from './hooks/useChatSocket';

export default function ChatApp() {
  const [userId, setUserId] = useState('');
  const [inputId, setInputId] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);


  const { send } = useChatSocket(userId, {
    onUsersUpdate: setUsers,
    onGroupUpdate: setGroups,
    onNewMessage: (msg) => setChat((prev) => [...prev, msg]),
  });

  const joinChat = () => setUserId(inputId);

  const sendMessage = () => {
    if (!message) return;

    const payload = {
      from: userId,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (selectedUser) {
      
      send({ event: 'chat', to: selectedUser, ...payload });
      setChat((prev) => [...prev, { ...payload, to: selectedUser }]);
    } else if (selectedGroup) {
      send({ event: 'group-chat', to: selectedGroup, ...payload });
     
    }
    

    setMessage('');
  };
const groupHandler = (groupId) => {
  if (!joinedGroups.includes(groupId)) {
    setJoinedGroups((prev) => [...prev, groupId]);
    send({ event: 'group-join', to: groupId });
  }
  setSelectedGroup(groupId);
  setSelectedUser(null);
};

const leaveGroup = (groupId) => {
  send({ event: 'leave-group', to: groupId });
  setJoinedGroups((prev) => prev.filter((g) => g !== groupId));
  if (selectedGroup === groupId) setSelectedGroup(null);
};

  const createGroup = () => {
    const newGroup = 'group' + groups.length;
    send({ event: 'group-create', id: newGroup });
  };

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-white">
        <input
          placeholder="Enter your name"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 mb-4 w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={joinChat}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md"
        >
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen font-sans bg-white text-gray-800">
      <Sidebar
        userId={userId}
        users={users}
        groups={groups}
        selectedUser={selectedUser}
        selectedGroup={selectedGroup}
        setSelectedUser={setSelectedUser}
        setSelectedGroup={setSelectedGroup}
        groupHandler={groupHandler}
        leaveGroup={leaveGroup}
        createGroup={createGroup}
        joinedGroups={joinedGroups}
      />
      <ChatWindow
        chat={chat}
        userId={userId}
        selectedUser={selectedUser}
        selectedGroup={selectedGroup}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
