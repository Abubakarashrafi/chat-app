import { useEffect, useRef } from 'react';

export default function useChatSocket(userId, {
  onUsersUpdate,
  onGroupUpdate,
  onNewMessage,
}) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socketRef.current = socket;

  

    socket.onopen = () => {
     
      if (userId) {
       
        socket.send(JSON.stringify({ event: 'new-user', userId }));
      }
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
       

        switch (data.event) {
          case 'user-joined':
          
            onUsersUpdate(data.users);
            break;

          case 'user-left':
           
            onUsersUpdate((prev) => prev.filter((id) => id !== data.userId));
            break;

          case 'group-update':
          
            onGroupUpdate(data.groups);
            break;

          case 'chat':
          case 'group-chat':
            onNewMessage({
              from: data.from,
              to: data.to,
              message: data.message,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
            break;

          default:
           
            break;
        }
      } catch (err) {
        console.error('❌ Error parsing message:', err.message, event.data);
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };

    socket.onclose = () => {
      console.warn('🔌 WebSocket connection closed');
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [userId]);

  const send = (payload) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    } else {
      console.warn('⚠️ Attempted to send but socket is not open.');
    }
  };

  return { send };
}
