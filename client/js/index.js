import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  container();
  takeRandomBrick();
  takeRandomKit();
  takeRandomVideo();
  createBasket.initializeBasket();
}

window.addEventListener('load', init);

async function fetchBrick() {
  const response = await fetch('/bricks');
  return response.json();
}

async function fetchVideo() {
  const response = await fetch('/videos');
  return response.json();
}

async function fetchKit() {
  const response = await fetch('/kits');
  return response.json();
}

async function takeRandomVideo() {
  const legos = await fetchVideo();
  const random = Math.floor(Math.random() * legos.length);
  const rand = legos.splice(random, 1);

  rand.forEach(video => {
    document.querySelector('video').src = video.videoSrc;
  });
}

function container() {
  const selectMain = document.querySelector('#tempMain');
  const featured = document.createElement('h1');
  featured.className = 'featured';
  featured.textContent = 'Top picks for you';

  const soon = document.createElement('h1');
  soon.textContent = 'Coming Soon';

  const video = document.createElement('video');
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  const container = document.createElement('div');
  container.className = 'container';
  selectMain.append(featured, container, soon, video);
}


async function takeRandomBrick() {
  const legos = await fetchBrick();

  const random = Math.floor(Math.random() * legos.length);
  const rands = legos.splice(random, 1);
  const second = legos.splice(random, 1);


  rands.forEach(rand => {
    createBrickElement(rand);
  });


  second.forEach(rand => {
    createBrickElement(rand);
  });
}

async function takeRandomKit() {
  const legos = await fetchKit();

  const random = Math.floor(Math.random() * legos.length);
  const rands = legos.splice(random, 1);
  const second = legos.splice(random, 1);


  rands.forEach(rand => {
    createKitElement(rand);
  });


  second.forEach(rand => {
    createKitElement(rand);
  });
}

function createBrickElement(rand) {
  const container = document.querySelector('.container');
  const slides = document.createElement('div');
  slides.className = 'slides';

  const slideNumber = document.createElement('div');
  slideNumber.className = 'slide-number';

  const a = document.createElement('a');
  a.href = `brick.html?brickId=${rand.legoId}`;

  const img = document.createElement('img');
  img.className = 'slide-image';
  img.src = rand.legoImage;

  a.append(img);
  slides.append(slideNumber, a);
  container.append(slides);
}

function createKitElement(rand) {
  const container = document.querySelector('.container');
  const slides = document.createElement('div');
  slides.className = 'slides';

  const slideNumber = document.createElement('div');
  slideNumber.className = 'slide-number';

  const a = document.createElement('a');
  a.href = `kit.html?legoId=${rand.legoId}`;

  const img = document.createElement('img');
  img.className = 'slide-image';
  img.src = rand.legoImage;

  a.append(img);
  slides.append(slideNumber, a);
  container.append(slides);
}
