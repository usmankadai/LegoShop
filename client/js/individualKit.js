import * as auth0 from './auth0.mjs';
import * as similarity from './individualBrick&Kit.js';
import * as createBasket from './createBasket.mjs';
import * as wishlist from './wishList.js';


async function init() {
  await kit();
  await auth0.executeAuth0();
  await fetchKits();
  createBasket.initializeBasket();
}

window.addEventListener('load', init);

async function fetchKit() {
  let legoId = window.location.search;
  legoId = legoId.slice(1);
  legoId = legoId.split('=');
  legoId = legoId[1];
  const response = await fetch(`/kit?legoId=${legoId}`);
  return response.json();
}

async function kit() {
  const details = await fetchKit();
  const image = document.querySelector('.kitIn');
  similarity.detail(details, image);
}

async function fetchKits() {
  const legos = await fetchKit();
  createBasket.setupListeners(legos);
  wishlist.setupListeners(legos);
}
