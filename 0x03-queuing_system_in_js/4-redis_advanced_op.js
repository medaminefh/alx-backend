import redis from 'redis';

const { createClient, print } = redis;
const client = createClient();

// Connect to Redis
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

await client.connect();

// Create Hash
await client.hSet('HolbertonSchools', 'Portland', 50, print);
await client.hSet('HolbertonSchools', 'Seattle', 80, print);
await client.hSet('HolbertonSchools', 'New York', 20, print);
await client.hSet('HolbertonSchools', 'Bogota', 20, print);
await client.hSet('HolbertonSchools', 'Cali', 40, print);
await client.hSet('HolbertonSchools', 'Paris', 2, print);

// Display Hash
await client.hGetAll('HolbertonSchools', function(err, obj) {
  if (err) {
    console.log(err);
  } else {
    console.log(obj);
  }
});