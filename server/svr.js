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
app.get('/kits', kits);
app.get('/auth-config', authConf);
// app.get('/404', error);

// app.get('/home', (req, res) => {
//   res.sendFile(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'index.html'));
// });


// 404 Error

app.use((req, res) => {
  res.redirect('/404.html');
  // res.sendStatus(404);
});

// function error(req, res) {
//   res.sendFile(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '404'));
// }

function bricks(req, res) {
  if (res || res.ok) {
    res.send(brickData.legos);
  } else {
    res.sendStatus(404);
  }
}

function kits(req, res) {
  if (res || res.ok) {
    res.send(kitData.legos);
  } else {
    res.sendStatus(404);
  }
}

function authConf(req, res) {
  res.json(authConfig);
}

app.listen(port, function (e) {
  console.log(`server ${e ? 'fails to start' : 'starts on localhost:'}` + port);
});
