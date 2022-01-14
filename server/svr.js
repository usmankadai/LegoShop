const express = require('express');
// const inventoriesData = require('./brickAndKitData.js');
const port = 8080;
const app = express();
app.use(express.static('./client'));

// creating a route

// app.get('/inventories/legos', function (req, res) {
//   res.send(inventoriesData.legos);
// });

app.listen(port, function () {
  console.log('server starts on localhost:' + port);
});

