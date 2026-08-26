import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// 1. Normal method=> How to store session of user in JSON
/*app.post cuz we have to add something and then a route for it
=> We are stringify the whole data here, cuz in .set method we can only store in string
req.params.id is the key*/
app.post("/user/:id/json", async(req,res) => {
     await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body));
     res.json({ savedAs: "json"});
});
// by the json method=> yaha hum "PARSE" krke data ko laayenge otherwise willnot run cuz it's a string
app.get("/user/:id/json", async(req,res) => {
    const raw = await redis.get(`user:${req.params.id}:json`);
    res.json({ user: raw ? JSON.parse(raw) : null});
});


/* 2. Hash method:  I don't want to store data in strings now, Storing complete data as an Object*/
app.post("/user/:id/hash", async(req,res) => {
    await redis.hset(`user:${req.params.id}:hash`, req.body);
    res.json({ savedAs: "hash"});
});
// ab data ko laane me=> jab bhi hash use kro then use "hgetall" to get data. 
app.get("/user/:id/hash", async(req,res) => {
    const user = await redis.hgetall(`user:${req.params.id}:hash`);
    res.json({ user });
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});