import express from 'express';
import brickData from './brickData.js';
import kitData from './kitData.js';
import authConfig from './auth-config.js';
import path from 'path';
import url from 'url';

const port = 8080;
const app = express();

app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../client')));

/// ////////////////////// creating a route

app.get('/bricks', bricks);
app.get('/brick', brick);
app.get('/kits', kits);
app.get('/kit', kit);
app.get('/auth-config', authConf);

// redirect to 404 Error page when an invalid url like is being search e.g. http://localhost:8080/kits.html/dsjsjsd.sd

app.use((req, res) => {
  res.redirect('/404.html');
});

function brick(req, res) {
  const legoId = req.query.legoId;
  if (!legoId) {
    res.sendStatus(400);
  }

  console.log(legoId);
  for (const brick of brickData.legos) {
    if (brick.legoId === legoId) {
      res.json(brick);
    }
  }
  res.sendStatus(404);
}

function bricks(req, res) {
  if (res || res.ok) {
    res.send(brickData.legos);
  } else if (!res || !res.ok) {
    res.sendStatus(404);
  }
}

function kit(req, res) {
  const kitId = req.query.kitId;
  if (!kitId) {
    res.sendStatus(400);
  }
  console.log(kitId);
  for (const kit of kitData.legos) {
    if (kit.kitId === kitId) {
      res.json(kit);
    }
  }
  res.sendStatus(404);
}

function kits(req, res) {
  if (res || res.ok) {
    res.send(kitData.legos);
  } else if (!res || !res.ok) {
    res.sendStatus(404);
  }
}

function authConf(req, res) {
  res.json(authConfig);
}

app.listen(port, function (e) {
  console.log(`server ${e ? 'fails to start' : 'starts on localhost:'}` + port);
});
