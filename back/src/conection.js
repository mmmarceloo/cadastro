const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'desafioconteiner',
    password: '123',
    port: 5432
})

const query = (text, param) => {
    return pool.query(text, param)
}

module.exports = {
    query
}