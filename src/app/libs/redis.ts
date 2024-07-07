// The Redis client used by Concierge will connect to a Valkey instance due to the Redis licence changes.
// Learn more at https://redis.io/blog/what-redis-license-change-means-for-our-managed-service-providers/
// To learn about why third-party licencing is important to Ceccun visit https://ceccun.com/tpl

import { createClient } from "redis";

export const redis = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();