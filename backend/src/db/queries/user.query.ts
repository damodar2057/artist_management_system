// backend/src/db/queries/user.query.ts

import { DBTables } from "src/common/constants/db-tables.enum";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";

export const usersQueries = {
    findAll: (options: IPaginationOptions) => {
        const { page = 1, pageSize= 10, sortBy='created_at', sortOrder = 'ASC'} = options

        return `
        SELECT *
        FROM ${DBTables.USER}
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT ${pageSize}
        OFFSET ${(page - 1) * pageSize}
        `
    },
    findOne: `SELECT * FROM ${DBTables.USER} WHERE ID=$1`,
    findByEmail: `SELECT * FROM ${DBTables.USER} WHERE email=$1`,
    create: 'INSERT INTO users(first_name, last_name, email, password, phone, dob, gender, role,  address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
    update: `UPDATE users 
            SET 
            first_name = CASE WHEN $1::text IS NOT NULL THEN $1::text ELSE first_name END,
            last_name = CASE WHEN $2::text IS NOT NULL THEN $2::text ELSE last_name END,
            email = CASE WHEN $3::text IS NOT NULL THEN $3::text ELSE email END,
            password = CASE WHEN $4::text IS NOT NULL THEN $4::text ELSE password END,
            phone = CASE WHEN $5::text IS NOT NULL THEN $5::text ELSE phone END,
            dob = CASE WHEN $6::date IS NOT NULL THEN $6::date ELSE dob END,
            gender = CASE WHEN $7::text IS NOT NULL THEN $7::text ELSE gender END,
            role = CASE WHEN $8::text IS NOT NULL THEN $8::text ELSE role END,
            address = CASE WHEN $9::text IS NOT NULL THEN $9::text ELSE address END,
            updated_at = NOW()
            WHERE id = $10
            RETURNING *`,
    delete: 'DELETE FROM users WHERE ID=$1 RETURNING *',    
    // ...
}