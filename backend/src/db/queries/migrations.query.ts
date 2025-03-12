// backend/src/db/queries/migrations.query.ts

import { DBTables } from 'src/common/constants/db-tables.enum';  


const migrationQueries = {
    createTable: `
    CREATE TABLE ${DBTables.MIGRATIONS} (
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL, 
        applied_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
    `,
    findAll: `SELECT * FROM ${DBTables.MIGRATIONS}`
};


export default migrationQueries;