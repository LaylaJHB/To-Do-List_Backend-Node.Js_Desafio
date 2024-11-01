const dotenv = require('dotenv');
const knex = require('knex');

dotenv.config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306,
    },
    migrations: {
      directory: './migrations' // Diretório onde as migrações serão salvas
    }
  }
};
