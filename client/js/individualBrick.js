import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as similarity from './individualBrick&Kit.js';
import * as localstorage from './storage.js';


async function init() {
  await brick();
  await home.execute();
  await auth0.executeAuth0();
  await bricklocalStorage();
  localstorage.cartReloadPage();
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
  const image = document.querySelector('.brickIn');
  similarity.detail(details, image);
}

async function bricklocalStorage() {
  const legos = await fetchBrick();
  localstorage.setupListeners(legos);
}

/// /////// update quantity

// function brickId() {
//   return window.location.hash.substring(1);
// }
