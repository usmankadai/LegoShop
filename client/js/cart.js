import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  isemptyCart();
  await createBasket.initializeCart();
  maintainQuantities();
  fetchBricks();
  emptyCart();
  checkOut();
}

window.addEventListener('load', init);

function isemptyCart() {
  const totalAmount = localStorage.getItem('totalAmount');
  const total = document.querySelector('.total');
  total.textContent = `Total: £${totalAmount}`;
  const clear = document.querySelector('.clearBasket');
  clear.addEventListener('click', () => {
    const items = document.querySelectorAll('.cartDiv');
    const checkout = document.querySelector('.continueToCheckout');
    const cartQuantityDOM = document.querySelector('#cart');
    localStorage.removeItem('basket');
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('totalQuantity');
    for (const item of items) {
      item.remove();
      checkout.remove();
      clear.remove();
      total.className = 'emptyCart total';
      emptyCart();
    }
    cartQuantityDOM.textContent = 0;
  });
}

async function fetchBricks() {
  const response = await fetch('/bricks', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  const legos = await response.json();
  return legos;
}

async function fetchKits() {
  const response = await fetch('/kits', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  const legos = await response.json();
  return legos;
}

async function maintainQuantities() {
  const bricks = await fetchBricks();
  const kits = await fetchKits();

  increaseItem(bricks, kits);
  decreaseItem(bricks, kits);
  removefromCart(bricks, kits);
}

function removefromCart(bricks, kits) {
  const basket = createBasket.basket;
  let remove = document.querySelectorAll('.remove');
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', (e) => {
      const total = parseInt(localStorage.getItem('totalAmount'));
      const totalDOM = document.querySelector('.total');
      const item = e.target.parentElement.parentElement;
      const itemID = item.querySelector('img').alt;
      const quantity = basket.get(itemID);
      let lego = bricks.find(({ legoId }) => legoId === itemID);
      if (lego === undefined) {
        lego = kits.find(({ legoId }) => legoId === itemID);
      }
      const legoPrice = parseInt(lego.price);
      const newTotal = total - (legoPrice * quantity);
      const totalQuantity = parseInt(localStorage.getItem('totalQuantity'));
      const cartQuantityDOM = document.querySelector('#cart');
      totalDOM.textContent = `Total : £${newTotal}`;
      e.target.parentElement.parentElement.remove();
      remove = document.querySelectorAll('.remove');
      if (remove.length < 1) {
        const form = document.querySelector('.cartStyle');
        while (form.firstChild) {
          form.removeChild(form.lastChild);
        }
        const total = document.querySelector('.total');
        const checkout = document.querySelector('.continueToCheckout');
        const clearBasket = document.querySelector('.clearBasket');
        checkout.style.visibility = 'hidden';
        clearBasket.style.visibility = 'hidden';
        total.style.visibility = 'hidden';
        localStorage.removeItem('basket');
        localStorage.removeItem('totalAmount');
        localStorage.removeItem('totalQuantity');
        emptyCart();
      }
      basket.delete(itemID);
      localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
      localStorage.setItem('totalAmount', newTotal);
      localStorage.setItem('totalQuantity', totalQuantity - quantity);
      cartQuantityDOM.textContent = totalQuantity - quantity;
    });
  }
}

function increaseItem(bricks, kits) {
  const increase = document.querySelectorAll('.increase');
  for (let i = 0; i < increase.length; i++) {
    increase[i].addEventListener('click', (e) => {
      let total = parseInt(localStorage.getItem('totalAmount'));
      const totalDOM = document.querySelector('.total');
      const cartDiv = document.querySelectorAll('.cartDiv');
      const basket = createBasket.basket;
      const item = e.target.parentElement.parentElement;
      const itemID = item.querySelector('img').alt;
      let lego = bricks.find(({ legoId }) => legoId === itemID);
      if (lego === undefined) {
        lego = kits.find(({ legoId }) => legoId === itemID);
      }
      const legoPrice = parseInt(lego.price);
      let totalQuantity = parseInt(localStorage.getItem('totalQuantity'));
      const cartQuantityDOM = document.querySelector('#cart');
      let quantity = basket.get(itemID);
      const newTotal = total + legoPrice;
      const qty = increase[i].parentElement.querySelector('span');
      let id = increase[i].parentElement.previousElementSibling;
      id = cartDiv[i].firstChild.alt;
      quantity += 1;
      totalQuantity += 1;
      total += lego.price;
      basket.set(id, quantity);
      totalDOM.textContent = `Total : £${total}`;
      qty.textContent = quantity;
      localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
      localStorage.setItem('totalAmount', newTotal);
      localStorage.setItem('totalQuantity', totalQuantity);
      cartQuantityDOM.textContent = totalQuantity;
    });
  }
}

function decreaseItem(bricks, kits) {
  const decrease = document.querySelectorAll('.decrease');
  for (let i = 0; i < decrease.length; i++) {
    decrease[i].addEventListener('click', (e) => {
      const total = parseInt(localStorage.getItem('totalAmount'));
      let newTotal;
      const totalDOM = document.querySelector('.total');
      const cartDiv = document.querySelectorAll('.cartDiv');
      const basket = createBasket.basket;
      const item = e.target.parentElement.parentElement;
      const itemID = item.querySelector('img').alt;
      let lego = bricks.find(({ legoId }) => legoId === itemID);
      if (lego === undefined) {
        lego = kits.find(({ legoId }) => legoId === itemID);
      }
      const legoPrice = parseInt(lego.price);
      let totalQuantity = parseInt(localStorage.getItem('totalQuantity'));
      let quantity = basket.get(itemID);
      const qty = decrease[i].parentElement.querySelector('span');
      let id = decrease[i].parentElement.previousElementSibling;
      id = cartDiv[i].firstChild.alt;
      if (quantity > 1) {
        const cartQuantityDOM = document.querySelector('#cart');
        quantity -= 1;
        totalQuantity -= 1;
        newTotal = total - legoPrice;
        basket.set(id, quantity);
        totalDOM.textContent = `Total : £${newTotal}`;
        qty.textContent = quantity;
        localStorage.setItem('totalAmount', newTotal);
        localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
        localStorage.setItem('totalQuantity', totalQuantity);
        cartQuantityDOM.textContent = totalQuantity;
      }
    });
  }
}

function emptyCart() {
  const total = document.querySelector('.total');
  const checkout = document.querySelector('.continueToCheckout');
  const clearBasket = document.querySelector('.clearBasket');
  const nullPrice = total.textContent === 'Total: £null';
  const zeroPounds = total.textContent === 'Total: £0';
  if (zeroPounds || nullPrice) {
    total.className = 'emptyCart';
    checkout.className = 'emptyCart';
    clearBasket.className = 'emptyCart';
  }
  const emptyDiv = document.querySelector('.legoBasket');
  if (emptyDiv.textContent === '') {
    const cartStyle = document.querySelector('.cartStyle');
    cartStyle.className = 'empty';
    cartStyle.textContent = 'Your Cart is empty, visit the link below to add items to your cart';

    const usefulLinks = document.createElement('div');
    usefulLinks.className = 'usefulLinks';

    const homeLink = document.createElement('a');
    homeLink.textContent = 'Home';
    homeLink.href = '/';

    const brickLink = document.createElement('a');
    brickLink.textContent = 'Bricks';
    brickLink.href = '/bricks.html';

    const kitLink = document.createElement('a');
    kitLink.textContent = 'Kits';
    kitLink.href = '/kits.html';

    usefulLinks.append(homeLink, brickLink, kitLink);
    cartStyle.append(usefulLinks);
  }
}

function checkOut() {
  const checkout = document.querySelector('.continueToCheckout, .emptyCart');
  checkout.addEventListener('click', () => {
    window.location = '/checkout.html';
  });
}
