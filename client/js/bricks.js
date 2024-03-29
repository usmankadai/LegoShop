import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as sort from './sort.mjs';
import * as upload from './uploadBrick.mjs';
import * as createBasket from './createBasket.mjs';


async function init() {
  bricksContainer();
  await createInventoryBricks();
  await home.execute();
  await auth0.executeAuth0();
  await brickslocalStorage();
  sort.sort();
  document.querySelector('#sort').addEventListener('change', sorting);
  upload.addEventListeners();
  createBasket.initializeBasket();
}

window.addEventListener('load', init);


function bricksContainer() {
  const brickTemplate = document.querySelector('.bricksPage');
  const createDiv = document.createElement('div');
  createDiv.className = 'mainLinks';
  brickTemplate.append(createDiv);
}

async function createInventoryBricks() {
  // Uploading JSON data Referenced from MDN. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('/bricks', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  const legos = await response.json();

  legos.forEach(lego => {
    htmlGridLayout(lego);
  });
}

export function htmlGridLayout(lego) {
  const mainLinks = document.querySelector('.mainLinks');
  const createLi = document.createElement('li');
  createLi.className = 'lis';
  const createLis = document.createElement('div');

  createLis.className = 'legoDiv';
  createLis.id = `lego${lego.legoId}`;
  createLis.dataset.set = `${lego.categoryId}`;

  const createA = document.createElement('a');
  createA.id = `a${lego.legoId}`;
  createA.href = `brick.html?legoId=${lego.legoId}`;

  const legoName = document.createElement('div');
  legoName.className = 'legoName';

  const legoPrice = document.createElement('div');
  legoPrice.className = 'legoPrice';
  legoPrice.id = `legoPrice${lego.legoId}`;
  legoPrice.textContent = `£${lego.price}`;
  if (lego.price < 1) {
    // check if the price is less than £1, get rid of the first two characters which is 0 and point.
    legoPrice.textContent = `${lego.price}p`.slice(2);
  }
  const addToCart = document.createElement('a');
  addToCart.className = 'addToCart';
  addToCart.textContent = 'Add to Cart';
  if (lego.stock < 1) {
    addToCart.textContent = 'Out of Stock';
    addToCart.className = 'addToCart outOfStock';
  }

  const removeBrick = document.createElement('div');
  removeBrick.textContent = 'Delete';
  removeBrick.className = 'deleteBrick emptyCart';

  const legoNameLink = document.createElement('a');
  legoNameLink.className = 'legoNameLink';
  legoNameLink.id = `legoLink${lego.legoId}`;
  legoNameLink.textContent = `${lego.legoName}`;
  legoNameLink.href = `brick.html?legoId=${lego.legoId}`;

  const createImg = document.createElement('img');
  createImg.id = `image${lego.legoId}`;
  createImg.src = `${lego.legoImage}`;
  createImg.alt = `#${lego.legoName}`;

  legoName.append(legoNameLink);
  createA.append(createImg);
  createLis.append(createA, legoName, legoPrice, addToCart, removeBrick);
  createLi.append(createLis);
  mainLinks.append(createLi);
}

async function brickslocalStorage() {
  const legos = await createBasket.fetchBricks();
  createBasket.listeners(legos);
}

async function sorting(e) {
  const color = e.target.options[e.target.selectedIndex].text;
  const legos = await fetchSortedItems(color);
  const legosDOM = document.querySelectorAll('.lis');
  legosDOM.forEach(lego => {
    lego.remove();
  });

  legos.forEach(lego => {
    htmlGridLayout(lego);
  });


  const cart = document.querySelectorAll('.addToCart');
  for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
      createBasket.listeners(legos);
    });
  }
}

async function fetchSortedItems(color) {
  const response = await fetch(`/bricks/${color}`);
  return response.json();
}
