// export let basket;


// export function setupListeners(legos) {
//   const cart = document.querySelector('.addToCart');

//   cart.addEventListener('click', () => {
//     storage(legos);
//     totalAmount(legos);
//   });
// }

// export function listeners(legos) {
//   const cart = document.querySelectorAll('.addToCart');
//   for (let i = 0; i < cart.length; i++) {
//     cart[i].addEventListener('click', () => {
//       storage(legos[i]);
//       // totalAmount(legos[i]);
//       // saveBrick(legos[i]);
//     });
//   }
// }


// // after reloading the page the number of items in the cart should not disappear.
// // It should be the same as the items in localStorage
// export function cartReloadPage() {
//   const empty = localStorage.getItem('legoInsideCart') === null;
//   if (empty) {
//     // debugger;
//     basket = new Map();
//     return;
//   }
//   basket = new Map(JSON.parse(localStorage.basket));
// }

// function saveBrick(lego) {
//   if (basket.has(lego.legoId)) {
//     let quantity = parseInt(basket.get(lego.legoId));
//     quantity += 1;
//     basket.set(lego.legoId, quantity);
//     // parseInt(basket.get(lego.legoId)) += 1;
//   } else {
//     basket.set(lego.legoId, 1);
//   }
//   // basket.set(lego.legoId, lego.stock);
//   // debugger;
//   // basket = JSON.parse(basket);


//   // let newBasket = [];

//   // if (basket != null) {
//   //   newBasket = basket;
//   //   // lego.cart = +1;
//   //   newBasket.push(lego);
//   // } else {
//   //   lego.cart = 1;
//   //   newBasket.push(lego);
//   // }
//   localStorage.setItem('basket', JSON.stringify(Array.from(basket)));
//   console.log(basket);
// }


// export function storage(lego, quantity) {
//   // let cartQuantity = localStorage.getItem('cartQuantity');
//   // cartQuantity = parseInt(cartQuantity);
//   // if (quantity === 'decrease') {
//   //   localStorage.setItem('cartQuantity', cartQuantity - 1);
//   //   document.querySelector('#cart').textContent = cartQuantity - 1;
//   // } else if (cartQuantity) {
//   //   localStorage.setItem('cartQuantity', cartQuantity + 1);
//   //   document.querySelector('#cart').textContent = cartQuantity + 1;
//   // } else {
//   //   localStorage.setItem('cartQuantity', 1);
//   //   document.querySelector('#cart').textContent = 1;
//   // }
//   // saves lego being clicked to the localStorage
//   saveBrick(lego);
// }


// export function initializeCart() {
//   console.log(basket);
//   debugger;
//   let cart = localStorage.getItem('basket');
//   cart = JSON.parse(cart);
//   if (cart) {
//     const legoBasket = document.querySelector('.legoBasket');
//     legoBasket.textContent = '';
//     // check the value of the legoInsideCart i.e the one we got in line 14 and loop through
//     // each lego similar to how it is in bricks.js and kits.js
//     const value = Object.values(cart);
//     value.forEach(lego => {
//       const createDiv = document.createElement('div');
//       createDiv.className = 'cartDiv';

//       const createImg = document.createElement('img');
//       createImg.src = `${lego.legoImage}`;
//       createImg.alt = `${lego.legoName}`;

//       const remove = document.createElement('div');
//       remove.textContent = 'Delete';
//       remove.className = 'remove';

//       const decrease = document.createElement('div');
//       decrease.className = 'decrease';
//       decrease.textContent = '<';

//       const cart = document.createElement('div');
//       cart.className = 'qtyContainer';

//       const quantity = document.createElement('span');
//       quantity.textContent = `${lego.cart}`;

//       const increase = document.createElement('div');
//       increase.textContent = '>';
//       increase.className = 'increase';

//       const legoPrice = document.createElement('div');
//       legoPrice.textContent = `£${lego.price}`;

//       const subTotal = document.createElement('div');
//       subTotal.textContent = `£${lego.price * lego.cart}`;

//       cart.append(decrease, quantity, increase, remove);
//       createDiv.append(createImg, cart, legoPrice, subTotal);
//       legoBasket.append(createDiv);
//     });
//   }
//   // removefromCart();
//   // quantity();
// }





// // function saveBrick(lego) {
// //   let basket = localStorage.getItem('legoInsideCart');
// //   basket = JSON.parse(basket);

// //   if (basket != null) {
// //     if (basket[lego.legoName] === undefined) {
// //       basket = {
// //         ...basket,
// //         [lego.legoName]: lego,
// //       };
// //     }
// //     basket[lego.legoName].cart += 1;
// //   } else {
// //     lego.cart = 1;
// //     basket = {
// //       [lego.legoName]: lego,
// //     };
// //   }
// //   localStorage.setItem('legoInsideCart', JSON.stringify(basket));
// // }

// export function totalAmount(lego, total) {
//   // // this function is similar to storage function it adds the total amount to the localStorage
//   // // and updates the total amount if there is another lego being added.
//   // const amount = document.querySelector('.total');
//   // let totalAmount = localStorage.getItem('totalAmount');
//   // if (total === 'decrease') {
//   //   totalAmount = parseInt(totalAmount);
//   //   localStorage.setItem('totalAmount', totalAmount - lego.price);
//   //   amount.textContent = `Total: £${totalAmount - lego.price}`;
//   // } else if (totalAmount != null) {
//   //   // checks whatever that was in totalAmount add it to the new amount that is being clicked.
//   //   totalAmount = parseInt(totalAmount);
//   //   localStorage.setItem('totalAmount', totalAmount + lego.price);
//   //   // amount.textContent = `Total: £${totalAmount + lego.price}`;
//   // } else {
//   //   localStorage.setItem('totalAmount', lego.price);
//   //   // amount.textContent = `Total: £${lego.price}`;
//   // }
// }


// // let basket = localStorage.getItem('legoInsideCart');
// // basket = JSON.parse(basket);

// // let newBasket = [];

// // if (basket != null) {
// //   newBasket = basket;
// //   // lego.cart = +1;
// //   newBasket.push(lego);
// // } else {
// //   lego.cart = 1;
// //   newBasket.push(lego);
// // }
// // localStorage.setItem('legoInsideCart', JSON.stringify(newBasket));
