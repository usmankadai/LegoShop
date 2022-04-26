import * as home from './home.js';
import * as auth0 from './auth0.js';
// import * as storage from './storage.js';


async function init() {
  createBasket();
  home.execute();
  await auth0.executeAuth0();
  await initializeCart();
  // stock();
  // check();
}

window.addEventListener('load', init);


let basket;



export function setupListeners(legos) {
  const cart = document.querySelector('.addToCart');

  cart.addEventListener('click', () => {
    saveBrick(legos);
    totalAmount(legos);
  });
}


export function listeners(legos) {
  const cart = document.querySelectorAll('.addToCart');
  for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
      saveBrick(legos[i]);
      // totalAmount(legos[i]);
      // saveBrick(legos[i]);
    });
  }
}


// after reloading the page the number of items in the cart should not disappear.
// It should be the same as the items in localStorage
function createBasket() {
  const empty = localStorage.getItem('basket') === null;
  if (empty) {
    debugger;
    basket = new Map();
    return;
  }
  basket = new Map(JSON.parse(localStorage.basket));
  console.log('createBasket', basket);
}

function saveBrick(lego) {
  if (basket.has(lego.legoId)) {
    let quantity = parseInt(basket.get(lego.legoId));
    quantity += 1;
    basket.set(lego.legoId, quantity);
    // parseInt(basket.get(lego.legoId)) += 1;
  } else {
    basket.set(lego.legoId, 1);
  }
  localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
  console.log(basket);
}


// export function add(lego) {
//   saveBrick(lego);
// }


function initializeCart() {
  console.log(basket);
  debugger;
  let cart = localStorage.getItem('basket');
  cart = JSON.parse(cart);
  if (cart) {
    const legoBasket = document.querySelector('.legoBasket');
    legoBasket.textContent = '';
    // check the value of the legoInsideCart i.e the one we got in line 14 and loop through
    // each lego similar to how it is in bricks.js and kits.js
    const value = Object.values(cart);
    value.forEach(lego => {
      const createDiv = document.createElement('div');
      createDiv.className = 'cartDiv';

      const createImg = document.createElement('img');
      createImg.src = `${lego.legoImage}`;
      createImg.alt = `${lego.legoName}`;

      const remove = document.createElement('div');
      remove.textContent = 'Delete';
      remove.className = 'remove';

      const decrease = document.createElement('div');
      decrease.className = 'decrease';
      decrease.textContent = '<';

      const cart = document.createElement('div');
      cart.className = 'qtyContainer';

      const quantity = document.createElement('span');
      quantity.textContent = `${lego.cart}`;

      const increase = document.createElement('div');
      increase.textContent = '>';
      increase.className = 'increase';

      const legoPrice = document.createElement('div');
      legoPrice.textContent = `£${lego.price}`;

      const subTotal = document.createElement('div');
      subTotal.textContent = `£${lego.price * lego.cart}`;

      cart.append(decrease, quantity, increase, remove);
      createDiv.append(createImg, cart, legoPrice, subTotal);
      legoBasket.append(createDiv);
    });
  }
  // removefromCart();
  // quantity();
}
