import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  createBasket.initializeBasket();
  initializeWish();
  emptyWishlist();
  // removefromList();
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
  const empty = localStorage.getItem('wishlist') === null;
  if (empty) {
    wishlist = new Map();
    localStorage.wishQuantity = 0;
  } else {
    wishlist = new Map(JSON.parse(localStorage.wishlist));
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
  for (const [id] of wishlist.entries()) {
    let lego = bricks.find(({ legoId }) => legoId === id);
    if (lego === undefined) {
      lego = kits.find(({ legoId }) => legoId === id);
    }
    const legoBasket = document.querySelector('.legoBasket, #cartTemplate');
    const createDiv = document.createElement('div');
    createDiv.className = 'cartDiv';
    const createImg = document.createElement('img');
    createImg.src = `${lego.legoImage}`;
    createImg.alt = `${lego.legoId}`;

    const remove = document.createElement('div');
    remove.textContent = 'Delete';
    remove.className = 'remove';


    const cart = document.createElement('div');
    cart.className = 'qtyContainer';

    const quantityDOM = document.createElement('span');
    quantityDOM.textContent = `${lego.stock}`;


    const legoPrice = document.createElement('div');
    legoPrice.textContent = `£${lego.price}`;


    cart.append(quantityDOM, remove);
    createDiv.append(createImg, cart, legoPrice);
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

// this function should be the similar to how i deleted from cart. But in this case
// i couldn't figure out why it's not even console.logging when i click Delete in the wishlist page...
// hence that's why i didn't do delete each item from the wishlist

// function removefromList() {
//   const remove = document.querySelectorAll('.cartDiv');
//   // debugger
//   console.log(remove);
//   for (let i = 0; i < remove.length; i++) {
//     remove[i].addEventListener('click', () => {
//       console.log('removed');
//     });
//   }
// }

function emptyWishlist() {
  const clear = document.querySelector('.clearWishlist, .emptyCart');

  clear.addEventListener('click', () => {
    const items = document.querySelectorAll('.cartDiv');
    localStorage.removeItem('wishQuantity');
    localStorage.removeItem('wishlist');
    for (const item of items) {
      item.remove();
      clear.remove();
    }
  });
}
