import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);
sql.connect();
