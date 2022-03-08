import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as cart from './cart.js';

async function init() {
  await brick();
  await home.execute();
  await auth0.executeAuth0();
  cart.executeCheckout();
}

window.addEventListener('load', init);

async function brick() {
  let legoId = window.location.search;
  legoId = legoId.slice(1);
  legoId = legoId.split('=');
  legoId = legoId[1];
  const response = await fetch(`/brick?legoId=${legoId}`);
  const details = await response.json();

  const image = document.querySelector('#brickIn');
  image.src = `${details.image}`;

  const price = document.querySelector('#pricing');
  price.textContent = `£${details.price}`;
  if (details.price < 1) {
    // check if the price is less than £1, get rid of the first two characters which is 0 and point.
    price.textContent = `${price.price}`.slice(2) + 'p';
  }
}
