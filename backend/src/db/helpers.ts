// 
import db from './index'
import { QueryOptions } from '../common/types/query-options.type';


// Generic CRUD operations
const dbOperationHelper = {

    findAll: async (table: string, options: QueryOptions) => {
        const { limit, offset, orderBy, sortOrder} = options;
        let query = `SELECT * FROM ${table}`;

        if (orderBy){
            query += `ORDER BY ${orderBy}`
        }

        if (limit){
            query += `LIMIT ${limit}`
        }

        if (offset) {
            query += `OFFSET ${offset}`
        }

        return db.query(query)
    },

    findOne: async (table: string, id: string, idColumn = 'id')=> {
        return db.query(`SELECT * FROM ${table} WHERE ${idColumn}= $1`,[id])
    }
}

export default dbOperationHelper