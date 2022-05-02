import express from 'express';
import authConfig from './auth-config.mjs';
import path from 'path';
import url from 'url';
import * as legoConfig from './legoConfig.mjs';
import multer from 'multer';


const port = 8080;
const app = express();

const uploader = multer({
  dest: 'upload',
  limits: { // for security
    fields: 10,
    fileSize: 1024 * 1024 * 20, // 20MB
    files: 1,
  },
});

app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../client')));

/// ////////////////////// creating a route
app.get('/bricks', asyncWrap(bricks));
app.get('/bricks/:sort', asyncWrap(sort));
app.get('/brick', asyncWrap(brick));
app.get('/kits', asyncWrap(kits));
app.get('/kit', asyncWrap(kit));
app.get('/videos', asyncWrap(video));
app.get('/auth-config', authConf);
// app.get('/uploads', design);
// app.put('/brick', asyncWrap(stock));
app.post('/bricks', uploader.single('legoImage'), express.json(), asyncWrap(upload));
app.use(redirect);

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

// async function stock(req, res) {
//   const stock = await legoConfig.stock(req.body);
//   res.json(stock);
// }

async function bricks(req, res) {
  try {
    const bricks = await legoConfig.listBricks();
    res.json(bricks);
  } catch (e) {
    error(res, e);
  }
}
async function brick(req, res) {
  try {
    const legoId = await legoConfig.findBrick(req.query.legoId);
    res.json(legoId);
  } catch (e) {
    error(res, e);
  }
}
async function sort(req, res) {
  try {
    const brickColor = await legoConfig.sort(req.params.sort);
    res.json(brickColor);
  } catch (e) {
    error(res, e);
  }
}

async function kits(req, res) {
  try {
    const kits = await legoConfig.listKits();
    res.json(kits);
  } catch (e) {
    error(res, e);
  }
}

async function kit(req, res) {
  try {
    const legoId = await legoConfig.findKit(req.query.legoId);
    res.json(legoId);
  } catch (e) {
    error(res, e);
  }
}

async function video(req, res) {
  const video = await legoConfig.video();
  if (!video) {
    res.status(404).send('No video found.');
    return;
  }
  res.json(video);
}

// async function design(req, res) {
//   const upload = await legoConfig.design();
//   if (!upload) {
//     res.status(404).send('No match for that link.');
//     return;
//   }
//   res.json(upload);
// }

async function upload(req, res) {
  try {
    const newLego = await legoConfig.addBrick(req.body, req.file);
    res.json(newLego);
  } catch (e) {
    error(res, e);
  }
}

// redirect to 404 Error page when an invalid url like is being search e.g. http://localhost:8080/kits.html/dsjsjsd.sd
function redirect(req, res) {
  res.redirect('/404Error.html');
}

function authConf(req, res) {
  res.json(authConfig);
}

app.listen(port, function (e) {
  console.log(`server ${e ? 'fails to start' : 'starts on localhost:'}` + port);
});


// retrieved from ws_api

function error(res, msg) {
  res.sendStatus(500);
  console.error(msg);
}
