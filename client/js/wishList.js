import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  createBasket.initializeBasket();
  await initializeWish();
  emptyWishlist();
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

function pushWishlistToServer() {
  const uid = auth0.getUserId();
  if (!uid) return;
  const items = Array.from(wishlist.entries()).map(([legoId, quantity]) => ({ legoId, quantity }));
  fetch('/user/wishlist', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-user-id': uid },
    body: JSON.stringify({ items }),
  }).catch(e => console.warn('Wishlist push failed:', e));
}

async function syncWishlistFromServer() {
  const uid = auth0.getUserId();
  if (!uid) return;
  try {
    const res = await fetch('/user/wishlist', { headers: { 'x-user-id': uid } });
    const serverItems = await res.json();
    // Merge: union of local + server
    const merged = new Map(Array.from(wishlist.entries()));
    for (const r of serverItems) {
      if (!merged.has(r.legoId)) merged.set(r.legoId, Number(r.quantity));
    }
    wishlist = merged;
    localStorage.setItem('wishlist', JSON.stringify(Array.from(merged)));
    localStorage.setItem('wishQuantity', merged.size);
    pushWishlistToServer();
  } catch (e) {
    console.warn('Wishlist sync failed:', e);
  }
}

async function initializeWish() {
  wishList();
  await syncWishlistFromServer();
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
  if (wishlist.size === 0) {
    showEmptyState();
    return;
  }

  for (const [id] of wishlist.entries()) {
    let lego = bricks.find(({ legoId }) => legoId === id);
    if (lego === undefined) {
      lego = kits.find(({ legoId }) => legoId === id);
    }
    if (!lego) continue;

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

function showEmptyState() {
  const msg = document.querySelector('.emptyMessage');
  msg.className = 'emptyState';
  msg.innerHTML = `
    <p>Your wishlist is empty.</p>
    <div class="usefulLinks">
      <a href="/bricks.html">Browse Bricks</a>
      <a href="/kits.html">Browse Kits</a>
    </div>
  `;
  document.querySelector('.cartStyle').style.display = 'none';
  document.querySelector('.clearWishlist').style.display = 'none';
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
  pushWishlistToServer();
}

function emptyWishlist() {
  const clear = document.querySelector('.clearWishlist, .emptyCart');

  clear.addEventListener('click', () => {
    const items = document.querySelectorAll('.cartDiv');
    localStorage.removeItem('wishQuantity');
    localStorage.removeItem('wishlist');
    wishlist.clear();
    pushWishlistToServer();
    for (const item of items) {
      item.remove();
    }
    clear.remove();
    showEmptyState();
  });
}
