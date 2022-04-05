import express from 'express';
// import legoConfig from './legoConfig.js';
// import kitData from './kitData.js';
import authConfig from './auth-config.js';
import path from 'path';
import url from 'url';
import * as legoConfig from './legoConfig.js';


const port = 8080;
const app = express();

app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../client')));

/// ////////////////////// creating a route
app.get('/bricks', asyncWrap(bricks));
app.get('/bricks/:red', asyncWrap(redBricks));
app.get('/brick', asyncWrap(brick));
app.get('/kits', asyncWrap(kits));
app.get('/kit', asyncWrap(kit));
app.get('/auth-config', authConf);
app.use(redirect);

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

async function bricks(req, res) {
  if (res || res.ok) {
    res.json(await legoConfig.listBricks());
  } else if (!res || !res.ok) {
    res.sendStatus(404);
  }
}
async function brick(req, res) {
  const legoId = await legoConfig.findBrick(req.query.legoId);
  if (!legoId) {
    res.status(404).send('No match for that lego.');
    return;
  }
  res.json(legoId);
}
async function redBricks(req, res) {
  if (res || res.ok) {
    res.json(await legoConfig.redBricks());
  } else if (!res || !res.ok) {
    res.sendStatus(404);
  }
}

async function kits(req, res) {
  if (res || res.ok) {
    res.json(await legoConfig.listKits());
  } else if (!res || !res.ok) {
    res.sendStatus(404);
  }
}
// function kits(req, res) {
//   if (res || res.ok) {
//     res.send(kitData.kits);
//   } else if (!res || !res.ok) {
//     res.sendStatus(404);
//   }
// }

async function kit(req, res) {
  const kitId = await legoConfig.findKit(req.query.kitId);
  if (!kitId) {
    // res.sendStatus(400);
    res.status(404).send('No match for that lego.');
    return;
  }
  res.json(kitId);
  // const kitId = req.query.kitId;
  // if (!kitId) {
  //   res.sendStatus(400);
  //   console.log('does not exist');
  // }
  // console.log(kitId);
  // for (const kit of kitData.kits) {
  //   if (kit.kitId === kitId) {
  //     res.json(kit);
  //   }
  // }
  // res.sendStatus(404);
}

// redirect to 404 Error page when an invalid url like is being search e.g. http://localhost:8080/kits.html/dsjsjsd.sd
function redirect(req, res) {
  res.redirect('/404.html');
}

function authConf(req, res) {
  res.json(authConfig);
}

app.listen(port, function (e) {
  console.log(`server ${e ? 'fails to start' : 'starts on localhost:'}` + port);
});
