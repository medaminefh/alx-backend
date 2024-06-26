import redis from 'redis';

const { createClient, print } = redis;
const client = createClient();

// Connect to Redis
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message || err.toString());
})
// Create Hash
client.hSet('HolbertonSchools', 'Portland', 50, print);
client.hSet('HolbertonSchools', 'Seattle', 80, print);
client.hSet('HolbertonSchools', 'New York', 20, print);
client.hSet('HolbertonSchools', 'Bogota', 20, print);
client.hSet('HolbertonSchools', 'Cali', 40, print);
client.hSet('HolbertonSchools', 'Paris', 2, print);

// Display Hash
client.hGetAll('HolbertonSchools', function(err, obj) {
  if (err) {
    console.log(err);
  } else {
    console.log(obj);
  }
});