import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as localstorage from './storage.js';


async function init() {
  kitsContainer();
  createInventoryKits();
  await home.execute();
  await auth0.executeAuth0();
  await kitslocalStorage();
  localstorage.cartReloadPage();
}

window.addEventListener('load', init);


function kitsContainer() {
  const kitTemplate = document.querySelector('.kitsPage');
  const createDiv = document.createElement('div');
  createDiv.className = 'mainLinks';
  kitTemplate.append(createDiv);
}

async function createInventoryKits() {
  console.log('kits loaded');
  // Uploading JSON data Referenced from MDN. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('/kits', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  const legos = await response.json();

  legos.forEach(lego => {
    htmlGridLayout(lego);
  });
}

function htmlGridLayout(lego) {
  const mainLinks = document.querySelector('.mainLinks');
  const createLi = document.createElement('li');
  createLi.className = 'lis';
  const createLis = document.createElement('div');

  createLis.className = 'legoDiv';
  createLis.id = `lego${lego.kitId}`;
  createLis.dataset.set = `${lego.categoryId}`;

  const createA = document.createElement('a');
  createA.id = `a${lego.kitId}`;
  createA.href = `kit.html?kitId=${lego.kitId}`;

  const legoName = document.createElement('div');
  legoName.className = 'legoName';

  const legoPrice = document.createElement('div');
  legoPrice.className = 'legoPrice';
  legoPrice.id = `legoPrice${lego.kitId}`;
  legoPrice.textContent = `£${lego.price}`;
  if (lego.price < 1) {
    // check if the price is less than £1, get rid of the first two characters which is 0 and point.
    legoPrice.textContent = `${lego.price}p`.slice(2);
  }
  const addToCart = document.createElement('button');
  addToCart.className = 'addToCart';
  addToCart.textContent = 'Add to Cart';

  const legoNameLink = document.createElement('a');
  legoNameLink.className = 'legoNameLink';
  legoNameLink.id = `legoLink${lego.kitId}`;
  legoNameLink.textContent = `${lego.legoName}`;
  legoNameLink.href = `kit.html?kitId=${lego.kitId}`;

  const createImg = document.createElement('img');
  createImg.id = `image${lego.kitId}`;
  createImg.src = `${lego.legoImage}`;
  createImg.alt = `#${lego.legoName}`;

  legoName.append(legoNameLink);
  createA.append(createImg);
  createLis.append(createA, legoName, legoPrice, addToCart);
  createLi.append(createLis);
  mainLinks.append(createLi);
}

async function fetchKits() {
  const response = await fetch('/kits', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
}

export async function kitslocalStorage() {
  const legos = await fetchKits();
  localstorage.listeners(legos);
}
