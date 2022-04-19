import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as localstorage from './storage.js';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  localstorage.cartReloadPage();
  container();
  takeRandomBrick();
  takeRandomKit();
  takeRandomVideo();
}

window.addEventListener('load', init);

async function fetchBrick() {
  const response = await fetch('/brickss/brickImage');
  return response.json();
}

async function fetchVideo() {
  const response = await fetch('/videos');
  return response.json();
}

async function fetchKit() {
  const response = await fetch('/kitss/kitImage');
  return response.json();
}

async function takeRandomVideo() {
  const legos = await fetchVideo();
  const random = Math.floor(Math.random() * legos.length);
  const rand = legos.splice(random, 1);

  rand.forEach(video => {
    document.querySelector('video').src = video.videoSrc;
    console.log(video.videoSrc);
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
    console.log(rand.legoImage);
    createBrickElement(rand);
  });


  second.forEach(rand => {
    console.log(rand.legoImage);
    createBrickElement(rand);
  });
}

async function takeRandomKit() {
  const legos = await fetchKit();

  const random = Math.floor(Math.random() * legos.length);
  const rands = legos.splice(random, 1);
  const second = legos.splice(random, 1);


  rands.forEach(rand => {
    console.log(rand.legoImage);
    createKitElement(rand);
  });


  second.forEach(rand => {
    console.log(rand.legoImage);
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
  a.href = `kit.html?kitId=${rand.kitId}`;

  const img = document.createElement('img');
  img.className = 'slide-image';
  img.src = rand.legoImage;

  a.append(img);
  slides.append(slideNumber, a);
  container.append(slides);
}
