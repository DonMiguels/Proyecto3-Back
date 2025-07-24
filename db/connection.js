const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mitrack',
  password: 'Miguel02',
  port: 5432,
});

module.exports = pool;
