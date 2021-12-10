import { createClient } from 'redis';
import { redisConfig } from '../common/redis-config';

const client = createClient(redisConfig);
const { promisify } = require("util");
export class RedisBase {


  async  getLRangeRedis(key: string, start: number, stop: number){
    return (await promisify(client.lrange).bind(client))(key, start,stop);
  }

  async rPushRedis(key: string, value: {}){
    return (await promisify(client.rpush).bind(client))(key, JSON.stringify(value))
  }
}
