import sqlite from 'sqlite';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid-random';
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
  console.log('sorting', sort);
  return db.all('SELECT * FROM legos WHERE sort LIKE ?', `%${sort}%`);
}

export async function findBrick(legoId) {
  const db = await dbConn;
  return db.get('SELECT * FROM legos WHERE legoId = ?', legoId);
}

// export async function stock(currentStock) {
//   const db = await dbConn;
//   console.log(currentStock);

//   const legoId = currentStock.legoId;
//   const legoName = currentStock.legoName;
//   const category = currentStock.category;
//   const legoImage = currentStock.legoImage;
//   const brickType = currentStock.brickType;
//   const sort = currentStock.sort;
//   const price = currentStock.price;
//   const stock = currentStock.stock;
//   const cart = 0;

//   const update = await db.run('UPDATE legos SET legoName = ? , category = ? , legoImage = ? , brickType = ? , sort = ? , price = ? , stock = ? , cart = ? WHERE legoId = ? , FROM legos', [legoName, category, legoImage, brickType, sort, price, stock, cart, legoId]);
//   // if nothing was updated, the ID doesn't exist
//   if (update.changes === 0) throw new Error('message not found');
//   return findBrick(legoId);
// }

export async function listKits() {
  const db = await dbConn;
  return db.all('SELECT * FROM kits');
}

export async function findKit(legoId) {
  const db = await dbConn;
  return db.get('SELECT * FROM kits WHERE legoId = ?', legoId);
}

export async function video() {
  const db = await dbConn;
  return db.all('SELECT * FROM videos');
}

export async function addBrick(brick, file) {
  let newFilename;
  if (file) {
    // we should first check that the file is actually an image
    // move the file where we want it
    const fileExt = file.mimetype.split('/')[1] || 'png';
    newFilename = file.filename + '.' + fileExt;

    try {
      await fs.renameAsync(file.path, path.join('client', 'images/bricks', newFilename));
    } catch (e) {
      console.error('failed to move incoming file', e);
    }
  }

  const db = await dbConn;
  const legoId = uuid();
  const legoName = brick.legoName;
  const category = brick.category;
  const legoImage = `images/bricks/${newFilename}`;
  const brickType = brick.brickType;
  const sort = brick.sort;
  const price = brick.price;
  const stock = brick.stock;
  const cart = 0;


  await db.run('INSERT INTO legos VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [legoId, legoName, category, legoImage, brickType, sort, price, stock, cart]);

  return listBricks();
}
