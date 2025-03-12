// backend/src/db/index.ts

import { Pool } from 'pg';
import dbConfig from '../config/db.config';

import logger from 'src/common/logger/logger';

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool(dbConfig);
    this.pool.on('error', (err) => {
      logger.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  public static async initialize() {
    try {
      const instance = this.getInstance();
     await instance.pool.query('SELECT NOW()');
      logger.info(`Database Connection successful!!`)
    } catch (error) {
      
      logger.error(`Error connection to database ${error}`)
      process.exit(-1)
    }
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }


}
// Export the pool for backward compatibility
export default Database;

