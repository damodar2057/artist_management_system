// backend/src/db/queries/user.query.ts

export const usersQueries = {
    findAll: 'SELECT * FROM users',
    findOne: 'SELECT * FROM users WHERE ID=$1',
    create: 'INSERT INTO users(first_name, last_name, email, password, phone, dob, gender, address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    update: `UPDATE users 
             SET first_name=$1, last_name=$2, email=$3, password=$4, phone=$5, dob=$6, gender=$7, address=$8
             WHERE ID=$9 
             RETURNING *`,
    delete: 'DELETE FROM users WHERE ID=$1 RETURNING *',    
    // ...
}