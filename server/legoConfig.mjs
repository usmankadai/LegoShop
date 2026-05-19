import { createClient } from '@libsql/client';
import uuid from 'uuid-random';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:database.sqlite',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

(async () => {
  try {
    await client.execute(`CREATE TABLE IF NOT EXISTS user_carts (
      userId TEXT NOT NULL,
      legoId TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      PRIMARY KEY (userId, legoId)
    )`);
    await client.execute(`CREATE TABLE IF NOT EXISTS user_wishlists (
      userId TEXT NOT NULL,
      legoId TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      PRIMARY KEY (userId, legoId)
    )`);
  } catch (e) {
    console.error('Failed to init user tables:', e);
  }
})();

async function query(sql, args = []) {
  const result = await client.execute({ sql, args });
  return result.rows;
}

async function queryOne(sql, args = []) {
  const result = await client.execute({ sql, args });
  return result.rows[0] ?? null;
}

async function run(sql, args = []) {
  return client.execute({ sql, args });
}

export async function listBricks() {
  return query('SELECT * FROM legos');
}

export async function sort(sort) {
  return query('SELECT * FROM legos WHERE sort LIKE ?', [`%${sort}%`]);
}

export async function findBrick(legoId) {
  return queryOne('SELECT * FROM legos WHERE legoId = ?', [legoId]);
}

export async function stock(req) {
  const basket = new Map(JSON.parse(req.params.basket));
  for (const [legoId, quantity] of basket) {
    const lego = await findBrick(legoId);
    if (!lego || lego.stock === undefined) continue;
    const updatedStock = lego.stock - quantity;
    if (updatedStock < 0) {
      console.log('Order not placed: insufficient stock for', legoId);
      continue;
    }
    const result = await run('UPDATE legos SET stock = ? WHERE legoId = ?', [updatedStock, legoId]);
    if (result.rowsAffected === 0) throw new Error('message not found');
    console.log(`Brick ${legoId}: stock ${lego.stock} → ${updatedStock}`);
  }
  return true;
}

export async function listKits() {
  return query('SELECT * FROM kits');
}

export async function findKit(legoId) {
  return queryOne('SELECT * FROM kits WHERE legoId = ?', [legoId]);
}

export async function video() {
  return query('SELECT * FROM videos');
}

export async function deleteBrick(legoId) {
  const result = await run('DELETE FROM legos WHERE legoId = ?', [legoId]);
  if (result.rowsAffected === 0) throw new Error('Brick not found');
}

export async function deleteKit(legoId) {
  const result = await run('DELETE FROM kits WHERE legoId = ?', [legoId]);
  if (result.rowsAffected === 0) throw new Error('Kit not found');
}

export async function updateBrick(legoId, data) {
  const result = await run(
    'UPDATE legos SET legoName = ?, price = ? WHERE legoId = ?',
    [data.legoName, Number(data.price), legoId]
  );
  if (result.rowsAffected === 0) throw new Error('Brick not found');
  return findBrick(legoId);
}

export async function updateKit(legoId, data) {
  const result = await run(
    'UPDATE kits SET legoName = ?, price = ? WHERE legoId = ?',
    [data.legoName, Number(data.price), legoId]
  );
  if (result.rowsAffected === 0) throw new Error('Kit not found');
  return findKit(legoId);
}

export async function addBrick(brick, imageUrl) {
  if (!brick.legoName || !brick.price || !imageUrl) throw new Error('Missing required fields');
  const legoId = uuid();
  await run('INSERT INTO legos VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    legoId, brick.legoName, 'Bricks', imageUrl,
    null, null, Number(brick.price), 10, 0,
  ]);
  return listBricks();
}

export async function getUserCart(userId) {
  return query('SELECT legoId, quantity FROM user_carts WHERE userId = ?', [userId]);
}

export async function setUserCart(userId, items) {
  await run('DELETE FROM user_carts WHERE userId = ?', [userId]);
  for (const { legoId, quantity } of items) {
    if (quantity > 0) {
      await run('INSERT INTO user_carts (userId, legoId, quantity) VALUES (?, ?, ?)', [userId, legoId, quantity]);
    }
  }
}

export async function getUserWishlist(userId) {
  return query('SELECT legoId, quantity FROM user_wishlists WHERE userId = ?', [userId]);
}

export async function setUserWishlist(userId, items) {
  await run('DELETE FROM user_wishlists WHERE userId = ?', [userId]);
  for (const { legoId, quantity } of items) {
    if (quantity > 0) {
      await run('INSERT INTO user_wishlists (userId, legoId, quantity) VALUES (?, ?, ?)', [userId, legoId, quantity]);
    }
  }
}

export async function search(term) {
  const like = `%${term}%`;
  const brickRows = await query('SELECT * FROM legos WHERE legoName LIKE ?', [like]);
  const kitRows = await query('SELECT * FROM kits WHERE legoName LIKE ?', [like]);
  return { bricks: brickRows, kits: kitRows };
}

export async function addKit(kit, imageUrl) {
  if (!kit.legoName || !kit.price || !imageUrl) throw new Error('Missing required fields');
  const legoId = uuid();
  await run('INSERT INTO kits VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    legoId, kit.legoName, 'Kits', imageUrl,
    'misc', 'Various', Number(kit.price), 10, 0,
  ]);
  return listKits();
}
