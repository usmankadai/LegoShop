import sqlite from 'sqlite';
import fs from 'fs';
import path from 'path';
// import uuid from 'uuid-random';
import util from 'util';


fs.renameAsync = fs.renameAsync || util.promisify(fs.rename);


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


export async function design() {
  const db = await dbConn;
  return db.all('SELECT * FROM upload');
}

export async function uploadLego(legoId, legoName, instructions, file) {
  let newFilename;
  if (file) {
    // we should first check that the file is actually an image
    // move the file where we want it
    const fileExt = file.mimetype.split('/')[1] || 'png';
    newFilename = file.filename + '.' + fileExt;
    await fs.renameAsync(file.path, path.join('client', 'images', newFilename));
  }

  const db = await dbConn;

  // const legoId = uuid();
  await db.run('INSERT INTO upload VALUES (?, ?, ?, ?)', [legoId, legoName, instructions, newFilename]);

  return design();
}
