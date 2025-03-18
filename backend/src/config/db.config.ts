//

import { PoolConfig } from "pg";

const dbConfig: PoolConfig = {

        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER  || 'advik',
        password: process.env.DATABASE_PASSWORD  || 'advik',
        database: process.env.DATABASE_NAME  || 'amsdb',
        port: parseInt(process.env.DATABASE_PORT as string)  || 5432,
    
}
export default dbConfig;