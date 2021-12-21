import * as IORedis from 'ioredis';
import { VercelRequest, VercelResponse } from '@vercel/node';

const redis = new IORedis.default(process.env.CACHE_URL);
const EXPIRE_TIME = 7200;

type CacheObjType = 'number' | 'string' | 'json';
export interface CacheObj {
  type: CacheObjType;
  content: any;
}

export async function updateCache(url: string, content: any) {
  let contentType: CacheObjType = 'string';
  if (typeof content === 'object') contentType = 'json';
  else if (typeof content === 'number') contentType = 'number';
  let obj: CacheObj = {
    type: contentType,
    content
  };
  await redis.set(url, JSON.stringify(obj));
  await redis.expire(url, EXPIRE_TIME);
}

async function cache(req: VercelRequest, res: VercelResponse, notFound: (req: VercelRequest, res: VercelResponse) => any) {
  let route = req.url || 'null-route';
  let redisRes: string | null = await redis.get(route);
  if (!redisRes) return await notFound(req, res);
  let obj: CacheObj = JSON.parse(redisRes);
  switch (obj.type) {
    case 'json':
      return res.setHeader('Content-Type', 'application/json; charset=utf-8').send(obj.content);
    case 'number':
      return res.send(Number(obj.content));
    default:
      return res.send(obj.content);
  }
}

export default cache;
