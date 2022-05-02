import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  emptyCart();
  await createBasket.initializeCart();
  checkOut();
  removefromCart();
}

window.addEventListener('load', init);


function emptyCart() {
  const totalAmount = localStorage.getItem('totalAmount');

  const total = document.querySelector('.total');

  total.textContent = `Total: £${totalAmount}`;

  const basket = localStorage.getItem('basket');

  if (basket === null) {
    const continueToCheckout = document.querySelector('.continueToCheckout');
    const clearBasket = document.querySelector('.clearBasket');
    clearBasket.className = 'emptyCart';
    continueToCheckout.className = 'emptyCart';
    total.className = 'emptyCart';

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

function removefromCart() {
  const remove = document.querySelectorAll('.remove');
  const cartDiv = document.querySelectorAll('.cartDiv');

  const cartQuantity = localStorage.getItem('cartQuantity');
  let basket = localStorage.getItem('basket');
  // basket = JSON.parse(basket);
  const totalAmount = localStorage.getItem('totalAmount');

  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', () => {
      console.log('working');
    });
  }
}

function checkOut() {
  const checkout = document.querySelector('.continueToCheckout');
  checkout.addEventListener('click', () => {
    window.location = '/checkout.html';
  });
}
