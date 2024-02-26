import env from "@main/env";
import { Redis } from "ioredis";
import { IKeyValueDatabase, IListDatabase } from "../common";

class RedisDB implements IKeyValueDatabase, IListDatabase {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      port: env.REDIS_PORT,
    });
  }

  async get(key: string): Promise<string> {
    try {
      return await this.client.get(key);
    } catch (error) {
      throw new Error("RedisDB.get: " + error.message);
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await this.client.set(key, value);
    } catch (error) {
      throw new Error("RedisDB.set: " + error.message);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      throw new Error("RedisDB.del: " + error.message);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return (await this.client.exists(key)) > 0;
    } catch (error) {
      throw new Error("RedisDB.exists: " + error.message);
    }
  }

  async flush(): Promise<void> {
    try {
      await this.client.flushall();
    } catch (error) {
      throw new Error("RedisDB.flush: " + error.message);
    }
  }

  async getList(list: string): Promise<string[]> {
    try {
      return await this.client.lrange(list, 0, -1);
    } catch (error) {
      throw new Error("RedisDB.getList: " + error.message);
    }
  }

  async addToList(list: string, ...item: string[]): Promise<void> {
    try {
      await this.client.lpush("list:" + list, ...item);
    } catch (error) {
      throw new Error("RedisDB.addToList: " + error.message);
    }
  }

  async removeFromList(list: string, item: string): Promise<void> {
    try {
      await this.client.lrem(list, 0, item);
    } catch (error) {
      throw new Error("RedisDB.removeFromList: " + error.message);
    }
  }

  async clearList(list: string): Promise<void> {
    try {
      await this.client.ltrim(list, 1, 0);
    } catch (error) {
      throw new Error("RedisDB.clearList: " + error.message);
    }
  }
}

export default new RedisDB();
