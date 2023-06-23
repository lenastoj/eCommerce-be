import RedisStore from "connect-redis"
import {createClient} from "redis"

const DEFAULT_EXPIRATION = 3600; //1h

class CacheClient {
  private client = createClient({
    socket: {
      port: Number(process.env.REDIS_PORT) || 6379,
      host: process.env.REDIS_HOST,
    },
  });

  constructor() {
    this.startClient();
  }

  private async startClient() {
    await this.client.connect();
    this.client.on('connect', (err) =>
      console.log('Connected to Redis server', err)
    );
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  public redisStore() {
    return new RedisStore({
        client: this.client,
        prefix: 'sessions:',
      })
  }

  public async getObject<T = any>(key: string): Promise<T | undefined> {
    const json = await this.client.get(key);
    if (json) {
      const data: T = JSON.parse(json);
      return data;
    }
    return undefined;
  }

  	public async exists(key: string): Promise<boolean> {
		return (await this.client.exists(key)) == 1;
	}

  public async setObjectExpiration(
    key: string,
    expire: number,
    data: object | boolean | number | string
  ): Promise<void> {
    await this.client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(data));
  }

  public async setObject(
    key: string,
    data: object | boolean | number | string
  ): Promise<void> {
    await this.client.set(key, JSON.stringify(data));
  }

  public async destroyObject(key: string): Promise<void> {
    await this.client.del(key);
  }
}

const cacheManager = new CacheClient();
export default cacheManager;

