import * as home from './home.js';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.js';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  emptyCart();
  await createBasket.initializeCart();
}

window.addEventListener('load', init);

// async function update() {
//   const baskets = JSON.parse(localStorage.getItem('basket'));
//   console.log(baskets);

//   for (const basket of baskets) {
//     console.log(basket);
//     console.log(basket.legoId);
//     const legoId = basket.legoId;
//     const payload = { legoId, legoName: basket.legoName, category: basket.category, legoImage: basket.legoImage, brickType: basket.brickType, sort: basket.sort, price: basket.price, stock: basket.stock, cart: basket.cart };
//     console.log('Payload', payload);

//     const response = await fetch(`/brick?legoId=${legoId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     if (!response) {
//       console.log('OH!!!');
//     }
//   }
//   window.localStorage.clear();
// }

// function check() {
//   document.querySelector('.authenticCheckout').addEventListener('click', update);
// }

// let basket;

// async function fetchBricks() {
//   const response = await fetch('/bricks', {
//     headers: {
//       'Content-type': 'application/json',
//     },
//   });

//   return await response.json();
// }

// export async function initializeCart() {
//   const legos = await fetchBricks();
//   for (const [id, quantity] of basket.entries()) {
//     const lego = legos.find(({ legoId }) => legoId === id);
//     const legoBasket = document.querySelector('.legoBasket');
//     const createDiv = document.createElement('div');
//     createDiv.className = 'cartDiv';

//     const createImg = document.createElement('img');
//     createImg.src = `${lego.legoImage}`;
//     createImg.alt = `${lego.legoName}`;

//     const remove = document.createElement('div');
//     remove.textContent = 'Delete';
//     remove.className = 'remove';

//     const decrease = document.createElement('div');
//     decrease.className = 'decrease';
//     decrease.textContent = '<';

//     const cart = document.createElement('div');
//     cart.className = 'qtyContainer';

//     const quantityDOM = document.createElement('span');
//     quantityDOM.textContent = quantity;

//     const increase = document.createElement('div');
//     increase.textContent = '>';
//     increase.className = 'increase';

//     const legoPrice = document.createElement('div');
//     legoPrice.textContent = `£${lego.price}`;

//     const subTotal = document.createElement('div');
//     subTotal.textContent = `£${lego.price * parseInt(quantity)}`;

//     cart.append(decrease, quantityDOM, increase, remove);
//     createDiv.append(createImg, cart, legoPrice, subTotal);
//     legoBasket.append(createDiv);
//   }
// }


function emptyCart() {
  const totalAmount = localStorage.getItem('totalAmount');
  const total = document.querySelector('.total');
  const checkout = document.querySelector('.continueToCheckout, .authenticCheckout');

  total.textContent = `Total: £${totalAmount}`;

  const nullPrice = total.textContent === 'Total: £null';
  const zeroPounds = total.textContent === 'Total: £0';

  if (zeroPounds || nullPrice) {
    total.className = 'emptyCart';
    checkout.className = 'emptyCart';
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

// function removefromCart() {
//   const remove = document.querySelectorAll('.remove');
//   const cartDiv = document.querySelectorAll('.cartDiv');

//   const cartQuantity = localStorage.getItem('cartQuantity');
//   let name;
//   let basket = localStorage.getItem('legoInsideCart');
//   basket = JSON.parse(basket);
//   const totalAmount = localStorage.getItem('totalAmount');

//   for (let i = 0; i < remove.length; i++) {
//     remove[i].addEventListener('click', () => {
//       console.log(cartQuantity);
//       name = cartDiv[i].firstChild.alt;
//       localStorage.setItem('cartQuantity', cartQuantity - basket[name].cart);

//       localStorage.setItem('totalAmount', totalAmount - (basket[name].price * basket[name].cart));

//       delete basket[name];
//       localStorage.setItem('legoInsideCart', JSON.stringify(basket));
//       initializeCart();
//       storage.cartReloadPage();
//       emptyCart();
//     });
//   }
// }

// function quantity() {
//   const increase = document.querySelectorAll('.increase');
//   const decrease = document.querySelectorAll('.decrease');
//   let basket = localStorage.getItem('legoInsideCart');
//   basket = JSON.parse(basket);

//   const cartDiv = document.querySelectorAll('.cartDiv');
//   let qty;
//   let lego = '';


//   for (let i = 0; i < increase.length; i++) {
//     increase[i].addEventListener('click', () => {
//       qty = decrease[i].parentElement.querySelector('span').textContent;
//       lego = decrease[i].parentElement.previousElementSibling;
//       lego = cartDiv[i].firstChild.alt;
//       console.log(lego);

//       basket[lego].cart = basket[lego].cart + 1;
//       storage.storage(basket[lego]);
//       storage.totalAmount(basket[lego]);
//       localStorage.setItem('legoInsideCart', JSON.stringify(basket));
//       initializeCart();
//     });
//   }

//   for (let i = 0; i < decrease.length; i++) {
//     decrease[i].addEventListener('click', () => {
//       qty = decrease[i].parentElement.querySelector('span').textContent;
//       lego = decrease[i].parentElement.previousElementSibling;
//       lego = cartDiv[i].firstChild.alt;
//       console.log(lego);

//       if (basket[lego].cart > 1) {
//         basket[lego].cart = basket[lego].cart - 1;
//         storage.storage(basket[lego], 'decrease');
//         storage.totalAmount(basket[lego], 'decrease');
//         localStorage.setItem('legoInsideCart', JSON.stringify(basket));
//         initializeCart();
//       }
//     });
//   }
// }
