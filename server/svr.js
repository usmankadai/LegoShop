import express from 'express';
import authConfig from './auth-config.mjs';
import path from 'path';
import url from 'url';
import * as legoConfig from './legoConfig.mjs';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const port = 8080;
export const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fields: 10,
    fileSize: 1024 * 1024 * 20,
    files: 1,
  },
});

function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    }).end(buffer);
  });
}

async function saveImage(file, folder) {
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    return uploadToCloudinary(file.buffer, folder);
  }
  // local dev fallback: save to client/images/<folder>/
  const { default: fs } = await import('fs/promises');
  const { default: nodePath } = await import('path');
  const { fileURLToPath } = await import('url');
  const __dirname = nodePath.dirname(fileURLToPath(import.meta.url));
  const ext = file.mimetype.split('/')[1] || 'png';
  const filename = `${Date.now()}.${ext}`;
  const dest = nodePath.join(__dirname, '..', 'client', 'images', folder, filename);
  await fs.writeFile(dest, file.buffer);
  return `images/${folder}/${filename}`;
}

app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../client')));

app.get('/search', asyncWrap(searchHandler));
app.get('/user/cart', requireUser, asyncWrap(async (req, res) => {
  res.json(await legoConfig.getUserCart(req.userId));
}));
app.put('/user/cart', requireUser, express.json(), asyncWrap(async (req, res) => {
  await legoConfig.setUserCart(req.userId, req.body.items || []);
  res.json({ ok: true });
}));
app.get('/user/wishlist', requireUser, asyncWrap(async (req, res) => {
  res.json(await legoConfig.getUserWishlist(req.userId));
}));
app.put('/user/wishlist', requireUser, express.json(), asyncWrap(async (req, res) => {
  await legoConfig.setUserWishlist(req.userId, req.body.items || []);
  res.json({ ok: true });
}));
app.get('/bricks', asyncWrap(bricks));
app.get('/bricks/:sort', asyncWrap(sort));
app.get('/brick', asyncWrap(brick));
app.get('/kits', asyncWrap(kits));
app.get('/kit', asyncWrap(kit));
app.get('/videos', asyncWrap(video));
app.get('/auth-config', authConf);
app.put('/brick/:basket', asyncWrap(stock));
app.post('/bricks', requireAdmin, uploader.single('legoImage'), express.json(), asyncWrap(upload));
app.post('/kits', requireAdmin, uploader.single('legoImage'), express.json(), asyncWrap(uploadKit));
app.put('/bricks/:legoId', requireAdmin, express.json(), asyncWrap(updateBrickHandler));
app.put('/kits/:legoId', requireAdmin, express.json(), asyncWrap(updateKitHandler));
app.delete('/bricks/:legoId', requireAdmin, asyncWrap(deleteBrickHandler));
app.delete('/kits/:legoId', requireAdmin, asyncWrap(deleteKitHandler));
app.use(redirect);

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next)).catch((e) => next(e || new Error()));
  };
}

function requireUser(req, res, next) {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  req.userId = userId;
  next();
}

function requireAdmin(req, res, next) {
  const email = req.headers['x-admin-email'];
  if (!email || !authConfig.adminEmails.includes(email)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

async function stock(req, res) {
  try {
    const result = await legoConfig.stock(req);
    res.json(result);
  } catch (e) {
    error(res, e);
  }
}

async function bricks(req, res) {
  try {
    res.json(await legoConfig.listBricks());
  } catch (e) {
    error(res, e);
  }
}

async function brick(req, res) {
  try {
    res.json(await legoConfig.findBrick(req.query.legoId));
  } catch (e) {
    error(res, e);
  }
}

async function searchHandler(req, res) {
  const term = req.query.q || '';
  res.json(await legoConfig.search(term));
}

async function sort(req, res) {
  try {
    res.json(await legoConfig.sort(req.params.sort));
  } catch (e) {
    error(res, e);
  }
}

async function kits(req, res) {
  try {
    res.json(await legoConfig.listKits());
  } catch (e) {
    error(res, e);
  }
}

async function kit(req, res) {
  try {
    res.json(await legoConfig.findKit(req.query.legoId));
  } catch (e) {
    error(res, e);
  }
}

async function video(req, res) {
  const result = await legoConfig.video();
  if (!result) {
    res.status(404).send('No video found.');
    return;
  }
  res.json(result);
}

async function upload(req, res) {
  try {
    const imageUrl = await saveImage(req.file, 'bricks');
    const newLego = await legoConfig.addBrick(req.body, imageUrl);
    res.json(newLego);
  } catch (e) {
    error(res, e);
  }
}

async function uploadKit(req, res) {
  try {
    const imageUrl = await saveImage(req.file, 'kits');
    const newKit = await legoConfig.addKit(req.body, imageUrl);
    res.json(newKit);
  } catch (e) {
    error(res, e);
  }
}

async function deleteBrickHandler(req, res) {
  try {
    await legoConfig.deleteBrick(req.params.legoId);
    res.json({ ok: true });
  } catch (e) {
    error(res, e);
  }
}

async function updateBrickHandler(req, res) {
  try {
    const updated = await legoConfig.updateBrick(req.params.legoId, req.body);
    res.json(updated);
  } catch (e) {
    error(res, e);
  }
}

async function updateKitHandler(req, res) {
  try {
    const updated = await legoConfig.updateKit(req.params.legoId, req.body);
    res.json(updated);
  } catch (e) {
    error(res, e);
  }
}

async function deleteKitHandler(req, res) {
  try {
    await legoConfig.deleteKit(req.params.legoId);
    res.json({ ok: true });
  } catch (e) {
    error(res, e);
  }
}

function redirect(req, res) {
  res.redirect('/404Error.html');
}

function authConf(req, res) {
  res.json(authConfig);
}

function error(res, msg) {
  res.sendStatus(500);
  console.error(msg);
}

if (!process.env.VERCEL) {
  app.listen(port, (e) => {
    console.log(`server ${e ? 'fails to start' : 'starts on localhost:'}` + port);
  });
}

export default app;
