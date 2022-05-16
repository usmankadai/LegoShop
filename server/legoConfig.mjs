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

export async function stock(req) {
  const db = await dbConn;
  const basket = new Map(JSON.parse(req.params.basket));
  for (const item of basket) {
    const legoId = item[0];
    const quantity = item[1];
    const lego = await findBrick(legoId);
    const currentStock = lego.stock;
    const updatedStock = currentStock - quantity;
    if (updatedStock < 0) {
      console.log('Order not placed. Item in the cart is more than what we have in stock');
      continue;
    }
    const update = await db.run('UPDATE legos SET stock = ? WHERE legoId = ?', [updatedStock, legoId]);
    if (update.changes === 0) throw new Error('message not found');
    console.log(`Old: ${currentStock}, new: ${updatedStock}`);
  }
  // if nothing was updated, the ID doesn't exist
  return true;
}

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
