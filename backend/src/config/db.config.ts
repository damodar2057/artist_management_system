//

import { PoolConfig } from "pg";

const dbConfig: PoolConfig = {

        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER  || 'testuser',
        password: process.env.DATABASE_PASSWORD  || 'testpassword',
        database: process.env.DATABASE_NAME  || 'artist_management_db',
        port: parseInt(process.env.DATABASE_PORT as string)  || 5432,
    
}
export default dbConfig;