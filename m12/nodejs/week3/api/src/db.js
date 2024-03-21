
// db.js
// import postgres from 'postgres'

// console.log({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   schema: process.env.DB_SCHEMA
// });

// const sql = postgres({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   // transform: postgres.toCamel
// }) // will use psql environment variables
// const sql = postgres(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`) // will use psql environment variables

// export default sql

import pg from 'pg'
const client = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  schema: process.env.DB_SCHEMA
})
await client.connect()

export default client
