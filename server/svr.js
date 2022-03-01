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
// app.get('/inventories/legoId', inventoryPage);
// app.get('/inventories/Kits/legoId', inventoryPage);
app.get('/auth-config', authConf);


// 404 Error


// app.use((req, res) => {
//   res.redirect('/404.html');
// });
// app.get('/404.html', (req, res) => {
//   res.sendFile(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '404.html'));
// });


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

// function inventoryPage(req, res) {
//   // res.send(inventoriesData.legos.find((x) => x.id === req.params.lego.id));
//   const inventory = req.query.legos.legoId;
//   if (inventoriesData.legos[inventory]) {
//     res.send(inventoriesData.legos[inventory]);
//   } else {
//     res.send('Error!!!');
//   }
// }

app.listen(port, function (e) {
  console.log(`server ${e ? 'fails to start' : 'starts on localhost:'}` + port);
});
