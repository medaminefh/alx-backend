import redis from 'redis';

const { createClient } = redis;
const client = createClient();

// Connect to Redis
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function(err) {
  console.log('Redis client not connected to the server:', err);
});

client.subscribe('holberton school channel', function(err, count) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Subscribed to ${count} channels`);
  }
});
