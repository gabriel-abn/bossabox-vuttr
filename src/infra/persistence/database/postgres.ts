import env from "@main/env";
import { Pool } from "pg";
import { IRelationalDatabase } from "../common";

class PostgreSQL implements IRelationalDatabase {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: env.POSTGRES_URL,
    });
  }

  async query(query: string, values?: any[]): Promise<any[]> {
    try {
      const client = await this.pool.connect();
      const result = await client.query(query, values);
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async execute(query: string, values?: any[]): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query(query, values);
      client.release();

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async close() {
    await this.pool.end();
  }
}

export default new PostgreSQL();
