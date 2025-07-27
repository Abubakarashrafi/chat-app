const {
  handleNewUser,
  handleChatMessage,
  handleGroupChat,
  handleGroupCreate,
  handleGroupJoin,
  handleLeaveGroup,
  handleDisconnect,
} = require('../services/chatService');

const userMap = new Map();
const groups = [];

module.exports = function registerWebSocket(wss) {
  wss.on('connection', (ws) => {
    ws.on('message', async (dataBuffer) => {
      try {
        const data = JSON.parse(dataBuffer.toString());
        switch (data.event) {
          case 'new-user':
            await handleNewUser(ws, wss, data, userMap, groups);
            break;
          case 'chat':
            await handleChatMessage(data);
            break;
          case 'group-chat':
            await handleGroupChat(data);
            break;
          case 'group-create':
            await handleGroupCreate(ws, wss, data, groups);
            break;
          case 'group-join':
            await handleGroupJoin(ws, data);
            break;
          case 'leave-group':
            await handleLeaveGroup(ws, data);
            break;
          default:
            console.warn('Unknown event:', data.event);
        }
      } catch (err) {
        console.error('❌ Failed to parse message:', err.message);
      }
    });

    ws.on('close', async () => {
      await handleDisconnect(ws, wss, userMap);
    });
  });
};
