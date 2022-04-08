import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as similarity from './individualBrick&Kit.js';
import * as localstorage from './storage.js';


async function init() {
  await kit();
  await home.execute();
  await auth0.executeAuth0();
  await fetchKits();
  localstorage.cartReloadPage();
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
  const image = document.querySelector('.kitIn');
  similarity.detail(details, image);
}

async function fetchKits() {
  const legos = await fetchKit();
  localstorage.setupListeners(legos);
}
