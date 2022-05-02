// this file creates basket and localStorage

export let basket;

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
      totalAmount(legos[i]);
    });
  }
}

function createBasket() {
  const cartQuantityDOM = document.querySelector('#cart');
  const empty = localStorage.getItem('basket') === null;
  if (empty) {
    basket = new Map();
    localStorage.totalQuantity = 0;
  } else {
    basket = new Map(JSON.parse(localStorage.basket));
    cartQuantityDOM.textContent = localStorage.getItem('totalQuantity');
  }
}

export function saveBrick(lego) {
  const cartQuantityDOM = document.querySelector('#cart');
  let totalQuantity = parseInt(localStorage.getItem('totalQuantity'));

  if (basket.has(lego.legoId)) {
    let quantity = parseInt(basket.get(lego.legoId));
    quantity += 1;
    totalQuantity += 1;
    basket.set(lego.legoId, quantity);
    localStorage.totalQuantity = totalQuantity;
  } else {
    basket.set(lego.legoId, 1);
    // localStorage.totalQuantity += 1;
    totalQuantity += 1;
    localStorage.totalQuantity = totalQuantity;
  }
  localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
  cartQuantityDOM.textContent = localStorage.getItem('totalQuantity');
}

export async function fetchBricks() {
  const response = await fetch('/bricks', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
}

export async function initializeCart() {
  createBasket();
  const bricks = await fetchBricks();
  const kits = await fetchKits();
  cartHtmlElement(bricks, kits);
}


export async function fetchKits() {
  const response = await fetch('/kits', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
}

function cartHtmlElement(bricks, kits) {
  let cartQuantity = 0;
  for (const [id, quantity] of basket.entries()) {
    let lego = bricks.find(({ legoId }) => legoId === id);
    if (lego === undefined) {
      lego = kits.find(({ legoId }) => legoId === id);
    }
    const legoBasket = document.querySelector('.legoBasket');
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

    const quantityDOM = document.createElement('span');
    quantityDOM.textContent = quantity;

    const increase = document.createElement('div');
    increase.textContent = '>';
    increase.className = 'increase';

    const legoPrice = document.createElement('div');
    legoPrice.textContent = `£${lego.price}`;

    const subTotal = document.createElement('div');
    subTotal.textContent = `£${lego.price * parseInt(quantity)}`;

    cart.append(decrease, quantityDOM, increase, remove);
    createDiv.append(createImg, cart, legoPrice, subTotal);
    legoBasket.append(createDiv);
    cartQuantity += parseInt(quantity);
  }
  const cartQuantityDOM = document.querySelector('#cart');
  cartQuantityDOM.textContent = cartQuantity;
  localStorage.totalQuantity = cartQuantity;
}

function addButton() {
  const increase = document.querySelectorAll('.increase');
  for (let i = 0; i < increase.length; i++) {
    increase[i].addEventListener('click', () => {
      console.log('clicked');
    });
  }
}

function totalAmount(lego) {
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


export function initializeBasket() {
  createBasket();
  addButton();
}
