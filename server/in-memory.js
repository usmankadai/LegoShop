import config from './config.js';
import Postgres from 'pg';

const psql = new Postgres.Client(config);
psql.connect();

psql.on('error', (err) => {
  console.error('SQL Fail', err);
  psql.end();
});
