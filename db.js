const { Pool } = require('pg');
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'music_library',
    password: 'sabina123',
    port: 5432,
};

const pool = new Pool(config);

module.exports = pool;
