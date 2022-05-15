import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';
// import * as updatedb from './updatedb.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  isemptyCart();
  await createBasket.initializeCart();
  createBasket.listener();
  // checkOut();
  removefromCart();
  increaseItem();
  decreaseItem();
  // updatedb.listener();
  // emptyCart();
}

window.addEventListener('load', init);


function isemptyCart() {
  const totalAmount = localStorage.getItem('totalAmount');

  const total = document.querySelector('.total');

  total.textContent = `Total: £${totalAmount}`;

  const clear = document.querySelector('.clearBasket');

  clear.addEventListener('click', () => {
    const cart = document.querySelector('.cartStyle');
    const total = document.querySelector('.total');
    const clear = document.querySelector('.clearBasket');
    const checkout = document.querySelector('.continueToCheckout');

    checkout.className = 'emptyCart';
    clear.className = 'emptyCart';
    total.className = 'emptyCart';
    cart.className = 'emptyCart';
    const items = document.querySelectorAll('.cartDiv');
    localStorage.removeItem('basket');
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('totalQuantity');
    for (const item of items) {
      item.remove();
    }
  });

  const nullPrice = total.textContent === 'Total: £null';
  const zeroPounds = total.textContent === 'Total: £0';
  const cart = document.querySelector('.cartStyle');
  const checkout = document.querySelector('.continueToCheckout');

  if (zeroPounds || nullPrice) {
    total.className = 'emptyCart';
    cart.className = 'emptyCart';
    checkout.className = 'emptyCart';
    clear.className = 'emptyCart';
    // checkout.className = 'emptyCart';
  }

  const basket = document.querySelector('.legoBasket');

  if (basket.textContent === null) {
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
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', (e) => {
      if (remove.length < 1) {
        const form = document.querySelector('.form');
        while (form.firstChild) {
          form.removeChild(form.lastChild);
        }
      } else {
        e.target.parentElement.parentElement.remove();
      }
    });
  }
}


function increaseItem() {
  // const total = parseInt(localStorage.getItem('totalAmount'));
  const cartDiv = document.querySelectorAll('.cartDiv');
  const basket = createBasket.basket;
  const increase = document.querySelectorAll('.increase');
  // const totalDOM = document.querySelector('.total');
  console.log(createBasket.basket);

  for (let i = 0; i < increase.length; i++) {
    increase[i].addEventListener('click', () => {
      console.log('increase');
      const qty = increase[i].parentElement.querySelector('span');
      let id = increase[i].parentElement.previousElementSibling;
      id = cartDiv[i].firstChild.alt;
      console.log(id);
      let quantity = basket.get(id);
      quantity += 1;
      // total += lego.price
      basket.set(id, quantity);
      localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
      // localStorage.setItem('totalAmount', total);
      qty.textContent = quantity;
      // totalDOM.textContent = total;
    });
  }
}

function decreaseItem() {
  const cartDiv = document.querySelectorAll('.cartDiv');
  const basket = createBasket.basket;
  const increase = document.querySelectorAll('.decrease');
  console.log(createBasket.basket);


  for (let i = 0; i < increase.length; i++) {
    increase[i].addEventListener('click', () => {
      console.log('increase');
      const qty = increase[i].parentElement.querySelector('span');
      let id = increase[i].parentElement.previousElementSibling;
      id = cartDiv[i].firstChild.alt;
      console.log(id);
      let quantity = basket.get(id);
      if (quantity > 1) {
        quantity -= 1;
      }
      basket.set(id, quantity);
      localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
      qty.textContent = quantity;
    });
  }
}

// function emptyCart() {
//   const clear = document.querySelector('.clearBasket');

//   clear.addEventListener('click', () => {
//     const cart = document.querySelector('.cartStyle');
//     const total = document.querySelector('.total');
//     const clear = document.querySelector('.clearBasket');
//     const checkout = document.querySelector('.continueToCheckout');

//     checkout.className = 'emptyCart';
//     clear.className = 'emptyCart';
//     total.className = 'emptyCart';
//     cart.className = 'emptyCart';
//     const items = document.querySelectorAll('.cartDiv');
//     localStorage.removeItem('basket');
//     localStorage.removeItem('totalAmount');
//     localStorage.removeItem('totalQuantity');
//     for (const item of items) {
//       item.remove();
//     }
//   });
// }

// function checkOut() {
//   const checkout = document.querySelector('.continueToCheckout');
//   checkout.addEventListener('click', () => {
//     window.location = '/checkout.html';
//   });
// }
