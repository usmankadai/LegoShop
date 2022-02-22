import express from 'express';
import inventoriesData from './brickAndKitData.js';
import authConfig from './auth-config.js';
import path from 'path';
import url from 'url';


const port = 8080;
const app = express();

app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../client')));

// creating a route

app.get('/inventories', inventories);
// app.get('/inventories/legoId', inventoryPage);
// app.get('/inventories/Kits/legoId', inventoryPage);
app.get('/auth-config', authConf);


function inventories(req, res) {
  if (res || res.ok) {
    res.send(inventoriesData.legos);
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

app.listen(port, function () {
  console.log('server starts on localhost:' + port);
});
