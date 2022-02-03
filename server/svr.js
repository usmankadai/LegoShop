import express from 'express';
import inventoriesData from './brickAndKitData.js';
import authConfig from './auth-config.js';
// import path from 'path';
// import url from 'url';


const port = 8080;
const app = express();
app.use(express.static('./client'));
// app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../client')));

// creating a route

app.get('/inventories', function (req, res) {
  res.send(inventoriesData.legos);
});
app.get('/auth-config', (req, res) => {
  res.json(authConfig);
});

app.listen(port, function () {
  console.log('server starts on localhost:' + port);
});
