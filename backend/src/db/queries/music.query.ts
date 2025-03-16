//  backend/src/db/queries/music.query.ts

import { DBTables } from "src/common/constants/db-tables.enum";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";

export const musicQueries = {
    findAll: (options: IPaginationOptions) => {
        const { page = 1, pageSize = 10, sortBy = 'created_at', sortOrder = 'ASC' } = options;

        return `
            SELECT * 
            FROM ${DBTables.MUSIC}
            ORDER BY ${sortBy} ${sortOrder}  
            LIMIT ${pageSize}  
            OFFSET ${(page - 1) * pageSize};
        `;
    },
    findOne: `SELECT * FROM ${DBTables.MUSIC} WHERE id = $1`,
    create: `INSERT INTO ${DBTables.MUSIC}(title, album_name, genre, artist_id) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
    update: `UPDATE ${DBTables.MUSIC} 
             SET 
             title = CASE WHEN $1::text IS NOT NULL THEN $1::text ELSE title END,
             album_name = CASE WHEN $2::text IS NOT NULL THEN $2::text ELSE album_name END,
             genre = CASE WHEN $3::text IS NOT NULL THEN $3::text ELSE genre END,
             artist_id = CASE WHEN $4::integer IS NOT NULL THEN $4::integer ELSE artist_id END,
             updated_at = NOW()
             WHERE id = $5 
             RETURNING *`,
    delete: `DELETE FROM ${DBTables.MUSIC} 
             WHERE id = $1 
             RETURNING *`
}
