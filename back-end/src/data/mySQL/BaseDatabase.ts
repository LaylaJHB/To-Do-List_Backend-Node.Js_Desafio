import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export class BaseDatabase {


   public static connection = knex({
      client: "mysql2",
      connection: {
         host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASS,
         database: process.env.DB_NAME,
         port: 3306,
         connectTimeout: 10000,
         multipleStatements: true
   }
})
}