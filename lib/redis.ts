import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient: RedisClientType = createClient({
    url: redisUrl,
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Could not connect to Redis', err);
    }
};

export { redisClient, connectRedis };