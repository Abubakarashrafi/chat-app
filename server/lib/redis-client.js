const {createClient} = require('redis');


const publisher = createClient({ url: 'redis://redis:6379' });
publisher.on('error', (err) => console.error('❌ Redis Publisher Error:', err));

const subscriber = createClient({ url: 'redis://redis:6379' });
subscriber.on('error', (err) => console.error('❌ Redis Subscriber Error:', err));


async function connectRedisClients() {
  if (!publisher.isOpen) await publisher.connect();
  if (!subscriber.isOpen) await subscriber.connect();
}

module.exports = {publisher,subscriber,connectRedisClients};