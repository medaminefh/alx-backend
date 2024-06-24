import redis from "redis";

const { createClient, print } = redis;

const client = createClient();

client.on("connect", () => console.log("Redis client connected to the server"));

client.on("error", (err) =>
	console.log("Redis client not connected to the server:", err)
);

await client.connect();

async function setNewSchool(schoolName, value) {
	await client.set(schoolName, value, print);
}

async function displaySchoolValue(schoolName) {
	const val = await client.get(schoolName);
	console.log(val)
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
