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

function publishMessage(message, time) {
  setTimeout(() => {
    console.log('About to send MESSAGE')
    client.publish('holberton school channel', message);
  }, time);
}

client.connect().then(() => {
    publishMessage("Holberton Student #1 starts course", 100);
    publishMessage("Holberton Student #2 starts course", 200);
    publishMessage("KILL_SERVER", 300);
    publishMessage("Holberton Student #3 starts course", 400);
  }).catch((err) => {
    console.log('Failed to connect the subscriber:', err);
  });

