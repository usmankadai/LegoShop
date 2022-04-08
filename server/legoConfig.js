import sqlite from 'sqlite';

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './server/migrations-sqlite' });
  return db;
}

const dbConn = init();


export async function listBricks() {
  const db = await dbConn;
  return db.all('SELECT * FROM legos');
}

export async function sort(sort) {
  const db = await dbConn;
  console.log('config', sort);
  return db.all('SELECT * FROM legos WHERE sort LIKE ?', `%${sort}%`);
}


export async function findBrick(legoId) {
  const db = await dbConn;
  return db.get('SELECT * FROM legos WHERE legoId = ?', legoId);
}


export async function listKits() {
  const db = await dbConn;
  return db.all('SELECT * FROM kits');
}

export async function findKit(kitId) {
  const db = await dbConn;
  return db.get('SELECT * FROM kits WHERE kitId = ?', kitId);
}
