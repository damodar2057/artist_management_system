//  backend/src/db/queries/music.query.ts

export const musicQueries = {
    findAll: 'SELECT * FROM artist',
    findOne: 'SELECT * FROM artist WHERE ID=$1',
    create: 'INSERT INTO artist(email, password) VALUES ($1,$2) RETURNING *',
    update: '',
    delete: ''
    // ...
}