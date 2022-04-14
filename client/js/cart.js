import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as localstorage from './storage.js';


async function init() {
  home.execute();
  await auth0.executeAuth0();
  await initializeCart();
  localstorage.cartReloadPage();
  checkout();
  emptyCart();
}

window.addEventListener('load', init);

function initializeCart() {
  let cart = localStorage.getItem('lego inside cart');
  cart = JSON.parse(cart);
  if (cart) {
    const legoBasket = document.querySelector('.legoBasket');
    legoBasket.textContent = '';
    // check the value of the lego inside cart i.e the one we got in line 14 and loop through
    // each lego similar to how it is in bricks.js and kits.js
    const value = Object.values(cart);
    value.forEach(lego => {
      const createDiv = document.createElement('div');
      createDiv.className = 'cartDiv';

      const createImg = document.createElement('img');
      createImg.src = `${lego.legoImage}`;
      createImg.alt = `${lego.legoName}`;

      // const span = document.createElement('span');
      // span.textContent = `${lego.legoName}`;

      const remove = document.createElement('div');
      remove.textContent = 'Delete';
      remove.className = 'remove';

      const decrease = document.createElement('button');
      decrease.textContent = '<';

      const cart = document.createElement('div');

      const quantity = document.createElement('span');
      quantity.textContent = `${lego.cart}`;

      const increase = document.createElement('button');
      increase.textContent = '>';

      const legoPrice = document.createElement('div');
      legoPrice.textContent = `£${lego.price}`;

      const subTotal = document.createElement('div');
      subTotal.textContent = `£${lego.price * lego.cart}`;

      cart.append(decrease, quantity, increase, remove);
      createDiv.append(createImg, cart, legoPrice, subTotal);
      legoBasket.append(createDiv);
    });
  }
  removefromCart();
}


function emptyCart() {
  const totalAmount = localStorage.getItem('totalAmount');

  const total = document.querySelector('.total');

  total.textContent = `Total: £${totalAmount}`;

  const nullPrice = total.textContent === 'Total: £null';
  const zeroPounds = total.textContent === 'Total: £0';

  if (nullPrice || zeroPounds) {
    total.className = 'emptyCart';
  }
  const empty = document.querySelector('.legoBasket');
  if (empty.textContent === '') {
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

function checkout() {
  const totalAmount = localStorage.getItem('totalAmount');

  const checkout = document.querySelector('.continueToCheckout, .authenticCheckout');
  const notAuthenticated = document.querySelector('.notAuthenticated');

  checkout.textContent = `Total: £${totalAmount}`;

  const emptyBasket = checkout.textContent === 'Total: £null';
  const zeroPounds = checkout.textContent === 'Total: £0';
  if (emptyBasket || zeroPounds) {
    checkout.className = 'emptyCart';
    notAuthenticated.className = 'emptyCart';
  }
  checkout.addEventListener('click', () => {
    window.location = '/checkout.html';
  });
}

function removefromCart() {
  const remove = document.querySelectorAll('.remove');
  const cartDiv = document.querySelectorAll('.cartDiv');

  const cartQuantity = localStorage.getItem('cartQuantity');
  let name;
  let basket = localStorage.getItem('lego inside cart');
  basket = JSON.parse(basket);
  const totalAmount = localStorage.getItem('totalAmount');

  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', () => {
      console.log(cartQuantity);
      name = cartDiv[i].firstChild.alt;
      localStorage.setItem('cartQuantity', cartQuantity - basket[name].cart);

      localStorage.setItem('totalAmount', totalAmount - (basket[name].price * basket[name].cart));

      delete basket[name];
      localStorage.setItem('lego inside cart', JSON.stringify(basket));
      initializeCart();
      localstorage.cartReloadPage();
      emptyCart();
      checkout();
    });
  }
}
