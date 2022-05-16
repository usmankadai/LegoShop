import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  createBasket.initializeBasket();
  initializeWish();
  // removefromList();
  emptyWishlist();
  // isemptyWishlist();
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
    const legoBasket = document.querySelector('.legoBasket');
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

// function removefromList() {
//   // const legos = await fetchBricks();
//   // const basket = createBasket.basket;
//   const remove = document.querySelectorAll('.cartDiv');
//   debugger
//   console.log(remove);
//   for (let i = 0; i < remove.length; i++) {
//     remove[i].addEventListener('click', () => {
//       console.log('removed');
//       // const total = parseInt(localStorage.getItem('totalAmount'));
//       // const totalDOM = document.querySelector('.total');
//       // const item = e.target.parentElement.parentElement;
//       // const itemID = item.querySelector('img').alt;
//       // const quantity = basket.get(itemID);
//       // const lego = legos.find(({ legoId }) => legoId === itemID);
//       // const legoPrice = parseInt(lego.price);
//       // const newTotal = total - (legoPrice * quantity);
//       // const totalQuantity = parseInt(localStorage.getItem('totalQuantity'));
//       // const cartQuantityDOM = document.querySelector('#cart');
//       // totalDOM.textContent = `Total : £${newTotal}`;
//       // e.target.parentElement.parentElement.remove();
//       // remove = document.querySelectorAll('.remove');
//       // if (remove.length < 1) {
//       //   const form = document.querySelector('.cartStyle');
//       //   while (form.firstChild) {
//       //     form.removeChild(form.lastChild);
//       //   }
//       //   // const totalAmount = localStorage.getItem('totalAmount');
//       //   // totalAmount = 0;
//       //   // localStorage.setItem('totalAmount', 0);
//       //   // localStorage.setItem('totalAmount', totalQuantity);
//       //   // const total = document.querySelector('.total');
//       //   // const checkout = document.querySelector('.continueToCheckout');
//       //   // const clearBasket = document.querySelector('.clearBasket');
//       //   // checkout.style.visibility = 'hidden';
//       //   // clearBasket.style.visibility = 'hidden';
//       //   // total.style.visibility = 'hidden';
//       //   // localStorage.removeItem('basket');
//       //   // localStorage.removeItem('totalAmount');
//       //   // localStorage.removeItem('totalQuantity');
//       //   // emptyCart();
//       // }
//       // basket.delete(itemID);
//       // localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
//       // localStorage.setItem('totalAmount', newTotal);
//       // localStorage.setItem('totalQuantity', totalQuantity - quantity);
//       // cartQuantityDOM.textContent = totalQuantity - quantity;
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
      // isemptyWishlist();
    }
  });
}

// function isemptyWishlist() {
//   const wishlist = localStorage.getItem('wishQuantity');
//   const clearWishlist = document.querySelector('.clearWishlist');

//   const nullPrice = wishlist === 'null';
//   const zeroPounds = wishlist === '0';

//   if (zeroPounds || nullPrice) {
//     clearWishlist.className = 'emptyCart';
//   }
//   const empty = document.querySelector('.legoBasket');
//   if (empty.textContent === '') {
//     const cartStyle = document.querySelector('.cartStyle');
//     cartStyle.className = 'empty';
//     cartStyle.textContent = 'Your Wishlist is empty, visit the link below to add items to your cart';

//     const usefulLinks = document.createElement('div');
//     usefulLinks.className = 'usefulLinks';

//     const homeLink = document.createElement('a');
//     homeLink.textContent = 'Home';
//     homeLink.href = '/';

//     const brickLink = document.createElement('a');
//     brickLink.textContent = 'Bricks';
//     brickLink.href = '/bricks.html';

//     const kitLink = document.createElement('a');
//     kitLink.textContent = 'Kits';
//     kitLink.href = '/kits.html';

//     usefulLinks.append(homeLink, brickLink, kitLink);
//     cartStyle.append(usefulLinks);
//   }
// }
