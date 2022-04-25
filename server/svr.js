import express from 'express';
import authConfig from './auth-config.js';
import path from 'path';
import url from 'url';
import * as legoConfig from './legoConfig.js';
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
app.get('/brickss/brickImage', asyncWrap(brickImage));
app.get('/videos', asyncWrap(video));
app.get('/kitss/kitImage', asyncWrap(kitImage));
app.get('/auth-config', authConf);
app.get('/uploads', design);
// app.post('/bricks', asyncWrap(stock));
app.put('/uploads', uploader.single('avatar'), express.json(), asyncWrap(upload));
app.use(redirect);

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

// async function stock(req, res) {
//   const stock = await legoConfig.stock();
//   if (!stock) {
//     res.status(404).send('No match');
//     return;
//   }
//   res.json(stock);
// }

async function bricks(req, res) {
  const bricks = await legoConfig.listBricks();
  if (!bricks) {
    res.status(404).send('No match for that link.');
    return;
  }
  res.json(bricks);
}
async function brick(req, res) {
  const legoId = await legoConfig.findBrick(req.query.legoId);
  if (!legoId) {
    res.status(404).send('No match for that brick.');
    return;
  }
  res.json(legoId);
}
async function sort(req, res) {
  const brickColor = await legoConfig.sort(req.params.sort);
  if (!brickColor) {
    res.status(404).send('No match for that color.');
    return;
  }
  res.json(brickColor);
}

async function kits(req, res) {
  const kits = await legoConfig.listKits();
  if (!kits) {
    res.status(404).send('No match for that link.');
  }
  res.json(kits);
}

async function kit(req, res) {
  const kitId = await legoConfig.findKit(req.query.kitId);
  if (!kitId) {
    res.status(404).send('No match for that brick.');
    return;
  }
  res.json(kitId);
}

async function brickImage(req, res) {
  const brickImage = await legoConfig.brickImage();
  if (!brickImage) {
    res.status(404).send('No match for that link.');
    return;
  }
  res.json(brickImage);
}

async function kitImage(req, res) {
  const brickImage = await legoConfig.kitImage();
  if (!brickImage) {
    res.status(404).send('No match for that link.');
    return;
  }
  res.json(brickImage);
}

async function video(req, res) {
  const video = await legoConfig.video();
  if (!video) {
    res.status(404).send('No video found.');
    return;
  }
  res.json(video);
}

async function design(req, res) {
  const upload = await legoConfig.design();
  if (!upload) {
    res.status(404).send('No match for that link.');
    return;
  }
  res.json(upload);
}

async function upload(req, res) {
  const newLego = await legoConfig.uploadLego(req.body.instructions, req.file);
  res.json(newLego);
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
