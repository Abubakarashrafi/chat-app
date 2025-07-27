const { publisher, subscriber } = require('../lib/redis-client');

function broadcast(wss, data) {
  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(payload);
    }
  });
}

exports.handleNewUser = async (ws, wss, data, userMap, groups) => {
  userMap.set(ws, data.userId);

  await subscriber.subscribe(`user:${data.userId}`, (message) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(message);
    }
  });

  broadcast(wss, {
    event: 'user-joined',
    users: Array.from(userMap.values()),
  });

  ws.send(JSON.stringify({
    event: 'group-update',
    groups,
  }));
};

exports.handleChatMessage = async (data) => {
  const payload = JSON.stringify({
    event: 'chat',
    from: data.from,
    to: data.to,
    message: data.message,
    timeStamp: data.timeStamp,
  });
  await publisher.publish(`user:${data.to}`, payload);
};

exports.handleGroupChat = async (data) => {
  const payload = JSON.stringify({
    event: 'group-chat',
    from: data.from,
    to: data.to,
    message: data.message,
    timeStamp: data.timeStamp,
  });
  await publisher.publish(`group:${data.to}`, payload);
};

exports.handleGroupCreate = async (ws, wss, data, groups) => {
  if (!groups.includes(data.id)) {
    groups.push(data.id);
    broadcast(wss, {
      event: 'group-update',
      groups,
    });
  }
};

exports.handleGroupJoin = async (ws, data) => {
  await subscriber.subscribe(`group:${data.to}`, (message) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(message);
    }
  });
};

exports.handleLeaveGroup = async (ws, data) => {
  await subscriber.unsubscribe(`group:${data.to}`);
};

exports.handleDisconnect = async (ws, wss, userMap) => {
  const userId = userMap.get(ws);
  userMap.delete(ws);

  if (userId) {
    await subscriber.unsubscribe(`user:${userId}`);
  }

  broadcast(wss, {
    event: 'user-left',
    userId,
  });
};
