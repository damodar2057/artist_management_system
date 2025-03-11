

export const artistQueries = {
    findAll: 'SELECT * FROM artist',
    findOne: 'SELECT * FROM artist WHERE ID=$1',
    create: 'INSERT INTO artist(email, password) VALUES ($1,$2) RETURNING *',
    // ...
}