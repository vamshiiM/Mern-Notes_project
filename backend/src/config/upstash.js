import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";


// for the rate limiter to configure its token keys
dotenv.config();

// a ratelimit that allows 5 requests per 20 sec
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s")
});

export default ratelimit