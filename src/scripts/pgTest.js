/*
  * Quick script for running concurrent sql queries on pg
  * Usage: node src/scripts/pgTest.js
  * */
require('dotenv').config();

const pg = require('@databases/pg');
const createConnectionPool = pg.default;
const sql = pg.sql;

// Levers
const POOL_SIZE = 100;
const NUM_QUERIES = 100;

// Environment
const ENV_DEV = 'dev';
const ENV_PROD = 'prod';
const ENV = ENV_DEV;

function getPostgresConfig(env) {
  if (env === ENV_PROD) {
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

  return {
    database: "nezaj",
    poolSize: POOL_SIZE,
  }

}

const conn = createConnectionPool(getPostgresConfig(ENV))

async function runQueries(conn) {
  console.time('runQueries'); // Start timing

  const queries = new Array(NUM_QUERIES).fill(null).map(() => conn.query(sql`SELECT 1`));
  await Promise.all(queries);

  console.timeEnd('runQueries'); // End timing and log the result
}

async function doWork() {
  console.log("Running in", ENV, "with pool_size", POOL_SIZE, "and num_queries", NUM_QUERIES)
  await runQueries(conn).then(() => {
    console.log('Finished running queries');
  }).catch(error => {
    console.error('Error executing queries:', error);
  })
  await runQueries(conn).then(() => {
    console.log('Finished running queries');
  }).catch(error => {
    console.error('Error executing queries:', error);
  })
  await runQueries(conn).then(() => {
    console.log('Finished running queries');
  }).catch(error => {
    console.error('Error executing queries:', error);
  })
}

doWork()
