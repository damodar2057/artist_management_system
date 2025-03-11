//

export const usersQueries = {
    findAll: 'SELECT * FROM users',
    findOne: 'SELECT * FROM users WHERE ID=$1',
    create: 'INSERT INTO users(email, password) VALUES ($1,$2) RETURNING *',
    // ...
}