// backend/src/db/queries/artist.query.ts

import { DBTables } from "src/common/constants/db-tables.enum";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";

export const artistQueries = {
    findAll: (options: IPaginationOptions) => {
        const { page = 1, pageSize = 10, sortBy = 'created_at', sortOrder = 'ASC' } = options;
        return `
        SELECT * FROM ${DBTables.ARTIST}
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT ${pageSize}
        OFFSET ${(page - 1) * pageSize}
        `
    },
    findOne: `SELECT * FROM ${DBTables.ARTIST} WHERE id=$1`,

    create: `INSERT INTO ${DBTables.ARTIST}(name, dob, gender, address, first_release_year, no_of_albums_released)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,

    update: `UPDATE ${DBTables.ARTIST}
            SET 
            name = CASE WHEN $1::text IS NOT NULL THEN $1::text ELSE name END,
            dob = CASE WHEN $2::date IS NOT NULL THEN $2::date ELSE dob END,
            gender = CASE WHEN $3::text IS NOT NULL THEN $3::text ELSE gender END,
            address = CASE WHEN $4::text IS NOT NULL THEN $4::text ELSE address END,
            first_release_year = CASE WHEN $5::integer IS NOT NULL THEN $5::integer ELSE first_release_year END,
            no_of_albums_released = CASE WHEN $6::integer IS NOT NULL THEN $6::integer ELSE no_of_albums_released END,
            updated_at = NOW()
            WHERE id = $7 
            RETURNING *`,

    delete: `DELETE FROM ${DBTables.ARTIST} WHERE id = $1 RETURNING *`
};
