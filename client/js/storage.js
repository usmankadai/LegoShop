export function setupListeners(legos) {
  const cart = document.querySelector('.addToCart');

  cart.addEventListener('click', () => {
    storage(legos);
    totalAmount(legos);
  });
}

export function listeners(legos) {
  const cart = document.querySelectorAll('.addToCart');

  for (let i = 0; i < cart.length; i++) {
    // console.log('running');
    cart[i].addEventListener('click', () => {
      storage(legos[i]);
      totalAmount(legos[i]);
      // totalTextContent();
    });
  }
}


// after reloading the page the number of items in the cart should not disappear.
// It should be the same as the items in localStorage
export function cartReloadPage() {
  const cartQuantity = localStorage.getItem('cartQuantity');
  if (cartQuantity) {
    document.querySelector('#cart').textContent = cartQuantity;
  }
}


export function storage(lego, quantity) {
  let cartQuantity = localStorage.getItem('cartQuantity');
  cartQuantity = parseInt(cartQuantity);

  // let basket = localStorage.getItem('lego inside cart');
  // basket = JSON.parse(basket);


  if (quantity === 'decrease') {
    localStorage.setItem('cartQuantity', cartQuantity - 1);
    document.querySelector('#cart').textContent = cartQuantity - 1;
  } else if (cartQuantity) {
    localStorage.setItem('cartQuantity', cartQuantity + 1);
    document.querySelector('#cart').textContent = cartQuantity + 1;
  } else {
    localStorage.setItem('cartQuantity', 1);
    document.querySelector('#cart').textContent = 1;
  }

  // if (cartQuantity) {
  //   localStorage.setItem('cartQuantity', cartQuantity + 1);
  //   document.querySelector('#cart').textContent = cartQuantity + 1;
  // } else {
  //   localStorage.setItem('cartQuantity', 1);
  //   document.querySelector('#cart').textContent = 1;
  // }
  // saves lego being clicked to the localStorage
  saveBrick(lego);
}

function saveBrick(lego) {
  let basket = localStorage.getItem('lego inside cart');
  basket = JSON.parse(basket);

  if (basket != null) {
    if (basket[lego.legoName] === undefined) {
      basket = {
        ...basket,
        [lego.legoName]: lego,
      };
    }
    basket[lego.legoName].cart += 1;
  } else {
    lego.cart = 1;
    basket = {
      [lego.legoName]: lego,
    };
  }
  localStorage.setItem('lego inside cart', JSON.stringify(basket));
}

export function totalAmount(lego, total) {
  // this function is similar to storage function it adds the total amount to the localStorage
  // and updates the total amount if there is another lego being added.
  const amount = document.querySelector('.total');
  let totalAmount = localStorage.getItem('totalAmount');
  if (total === 'decrease') {
    totalAmount = parseInt(totalAmount);
    localStorage.setItem('totalAmount', totalAmount - lego.price);
    amount.textContent = `Total: £${totalAmount - lego.price}`;
  } else if (totalAmount != null) {
    // checks whatever that was in totalAmount add it to the new amount that is being clicked.
    totalAmount = parseInt(totalAmount);
    localStorage.setItem('totalAmount', totalAmount + lego.price);
    amount.textContent = `Total: £${totalAmount + lego.price}`;
  } else {
    localStorage.setItem('totalAmount', lego.price);
    amount.textContent = `Total: £${lego.price}`;
  }
}
