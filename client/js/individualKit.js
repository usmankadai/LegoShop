import * as home from './home.js';
import * as auth0 from './auth0.js';
// import * as cart from './cart.js';
import * as similarity from './jj.js';

async function init() {
  await kit();
  await home.execute();
  await auth0.executeAuth0();
  await fetchKits();
  similarity.cartReloadPage();
}

window.addEventListener('load', init);


async function fetchKit() {
  let kitId = window.location.search;
  kitId = kitId.slice(1);
  kitId = kitId.split('=');
  kitId = kitId[1];
  const response = await fetch(`/kit?kitId=${kitId}`);
  return response.json();
}


async function kit() {
  const details = await fetchKit();
  similarity.detail(details);
}

// similar code to bricksLocalStorage reused in this code file. But the only change
// here is in the fetchBrick function where /bricks was changed to /Bricks.
async function fetchKits() {
  const legos = await fetchKit();
  const cart = document.querySelector('.addToCart');

  cart.addEventListener('click', () => {
    storage(legos);
    totalAmount(legos);
  });
}


function storage(lego) {
  let cartItems = localStorage.getItem('cartQuantity');

  cartItems = parseInt(cartItems);

  if (cartItems) {
    localStorage.setItem('cartQuantity', cartItems + 1);
    document.querySelector('#cart').textContent = cartItems + 1;
  } else {
    localStorage.setItem('cartQuantity', 1);
    document.querySelector('#cart').textContent = 1;
  }
  // saves Brick being clicked to the localStorage
  saveBrick(lego);
}

function saveBrick(lego) {
  let basket = localStorage.getItem('lego inside cart');
  basket = JSON.parse(basket);

  if (basket != null) {
    if (basket[lego.legoName] === undefined) {
      basket = {
        ...basket,
        [lego.legoName]: lego,
      };
    }
    basket[lego.legoName].cart += 1;
  } else {
    lego.cart = 1;
    basket = {
      [lego.legoName]: lego,
    };
  }
  localStorage.setItem('lego inside cart', JSON.stringify(basket));
}

function totalAmount(lego) {
  // this function is similar to storage function it adds the total amount to the localStorage
  // and updates the total amount if there is another lego being added.

  let totalAmount = localStorage.getItem('totalAmount');
  console.log('The amount is', totalAmount);

  // checks whatever that was in totalAmount add it to the new amount that is being clicked.
  if (totalAmount != null) {
    totalAmount = parseInt(totalAmount);
    localStorage.setItem('totalAmount', totalAmount + lego.price);
  } else {
    localStorage.setItem('totalAmount', lego.price);
  }
}
