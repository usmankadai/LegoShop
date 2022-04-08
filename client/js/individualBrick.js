import * as home from './home.js';
import * as auth0 from './auth0.js';

async function init() {
  await brick();
  await home.execute();
  await auth0.executeAuth0();
  await fetchBricks();
  cartReloadPage();
}

window.addEventListener('load', init);

async function fetchBrick() {
  let legoId = window.location.search;
  legoId = legoId.slice(1);
  legoId = legoId.split('=');
  legoId = legoId[1];
  const response = await fetch(`/brick?legoId=${legoId}`);
  return await response.json();
}

async function brick() {
  const details = await fetchBrick();
  detail(details);
}

export function detail(details) {
  const image = document.querySelector('.brickIn');
  image.src = `${details.legoImage}`;
  image.alt = `${details.legoName}`;

  const price = document.querySelector('.legoPrice');
  price.textContent = `£${details.price}`;

  if (details.price < 1) {
    // check if the price is less than £1, get rid of the first two characters which is 0 and point.
    price.textContent = `${price.price}`.slice(2) + 'p';
  }
  const stock = document.querySelector('.stock');
  stock.textContent = `Stock: ${details.stock}`;

  const category = document.querySelector('.category');
  category.textContent = `Category: ${details.category}`;

  const description = document.querySelector('.description');
  description.textContent = `${details.legoName}`;
}

// similar code to bricksLocalStorage reused in this code file. But the only change
// here is in the fetchBrick function where /bricks was changed to /Bricks.
async function fetchBricks() {
  const legos = await fetchBrick();

  const cart = document.querySelector('.addToCart');

  cart.addEventListener('click', () => {
    storage(legos);
    totalAmount(legos);
  });
}

// after reloading the page the number of items in the cart should not disappear.
// It should be the same as the items in localStorage

export function cartReloadPage() {
  const cartItems = localStorage.getItem('cartQuantity');
  if (cartItems) {
    document.querySelector('#cart').textContent = cartItems;
  }
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

export function totalAmount(lego) {
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
