import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  createBasket.initializeBasket();
  initializeWish();
  // wishList();
}

window.addEventListener('load', init);


let wishlist;

export function setupListeners(legos) {
  const cart = document.querySelector('.addToWishList');

  cart.addEventListener('click', () => {
    saveBrick(legos);
  });
}

function wishList() {
  // const cartQuantityDOM = document.querySelector('#wishlist');
  const empty = localStorage.getItem('wishlist') === null;
  if (empty) {
    wishlist = new Map();
    localStorage.wishQuantity = 0;
  } else {
    wishlist = new Map(JSON.parse(localStorage.wishlist));
    // cartQuantityDOM.textContent = localStorage.getItem('totalQuantity');
  }
}

async function initializeWish() {
  wishList();
  const bricks = await fetchBricks();
  const kits = await fetchKits();
  cartHtmlElement(bricks, kits);
}

async function fetchBricks() {
  const response = await fetch('/bricks', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
}

async function fetchKits() {
  const response = await fetch('/kits', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
}

function cartHtmlElement(bricks, kits) {
  // let cartQuantity = 0;
  for (const [id, quantity] of wishlist.entries()) {
    let lego = bricks.find(({ legoId }) => legoId === id);
    if (lego === undefined) {
      lego = kits.find(({ legoId }) => legoId === id);
    }
    const legoBasket = document.querySelector('.legoBasket');
    const createDiv = document.createElement('div');
    createDiv.className = 'cartDiv';
    const createImg = document.createElement('img');
    createImg.src = `${lego.legoImage}`;
    createImg.alt = `${lego.legoId}`;

    const remove = document.createElement('div');
    remove.textContent = 'Delete';
    remove.className = 'remove';

    const decrease = document.createElement('div');
    decrease.className = 'decrease';
    decrease.textContent = '<';

    const cart = document.createElement('div');
    cart.className = 'qtyContainer';

    const quantityDOM = document.createElement('span');
    quantityDOM.textContent = quantity;

    const increase = document.createElement('div');
    increase.textContent = '>';
    increase.className = 'increase';

    const legoPrice = document.createElement('div');
    legoPrice.textContent = `£${lego.price}`;

    const subTotal = document.createElement('div');
    subTotal.textContent = `£${lego.price * parseInt(quantity)}`;

    cart.append(decrease, quantityDOM, increase, remove);
    createDiv.append(createImg, cart, legoPrice, subTotal);
    legoBasket.append(createDiv);
  }
}


function saveBrick(lego) {
  let wishQuantity = parseInt(localStorage.getItem('wishQuantity'));

  if (wishlist.has(lego.legoId)) {
    let quantity = parseInt(wishlist.get(lego.legoId));
    quantity += 1;
    wishQuantity += 1;
    wishlist.set(lego.legoId, quantity);
    localStorage.wishQuantity = wishQuantity;
  } else {
    wishlist.set(lego.legoId, 1);
    localStorage.wishQuantity += 1;
    wishQuantity += 1;
    localStorage.wishQuantity = wishQuantity;
  }
  localStorage.setItem('wishlist', JSON.stringify(Array.from(wishlist)));
}
