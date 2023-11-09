/*
  * Quick script for running concurrent sql queries on pg
  * Usage: node src/scripts/pgTest.js
  * */
require('dotenv').config();

const pg = require('@databases/pg');
const createConnectionPool = pg.default;
const sql = pg.sql;

const POOL_SIZE = 50;
const NUM_QUERIES = 400;

function getPostgresConfig() {
  return {
    user: process.env.INSTANT_DB_USER,
    database: process.env.INSTANT_DB_DATABASE,
    password: process.env.INSTANT_DB_PASSWORD,
    port: process.env.INSTANT_DB_PORT,
    host: process.env.INSTANT_DB_HOST,
    bigIntMode: 'bigint',
    poolSize: POOL_SIZE,
  }
}

const conn = createConnectionPool(getPostgresConfig())

async function runQueries(conn) {
  console.time('runQueries'); // Start timing

  const queries = new Array(NUM_QUERIES).fill(null).map(() => conn.query(sql`SELECT 1`));
  await Promise.all(queries);

  console.timeEnd('runQueries'); // End timing and log the result
}

runQueries(conn).then(() => {
  console.log('Finished running queries');
}).catch(error => {
  console.error('Error executing queries:', error);
})
