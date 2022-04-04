// similar code to bricksLocalStorage reused in this code file. But the only change
// here is in the fetchKit function where /bricks was changed to /kits.
async function fetchKits() {
  const response = await fetch('/kits', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  const legos = await response.json();

  const cart = document.querySelectorAll('.addToCart');

  for (let i = 0; i < cart.length; i++) {
    // console.log('running');
    cart[i].addEventListener('click', () => {
      storage(legos[i]);
      totalAmount(legos[i]);
    });
  }
}

// after reloading the page the number of items in the cart should not disappear.
// It should be the same as the items in localStorage

function cartReloadPage() {
  const cartItems = localStorage.getItem('cartQuantity');
  if (cartItems) {
    document.querySelector('#cart').textContent = cartItems;
  }
}

function storage(lego) {
  let cartItems = localStorage.getItem('cartQuantity');

  cartItems = parseInt(cartItems);

  if (cartItems) {
    localStorage.setItem('cartQuantity', cartItems + 1);
    document.querySelector('#cart').textContent = cartItems + 1;
  } else {
    localStorage.setItem('cartQuantity', 1);
    document.querySelector('#cart').textContent = 1;
  }
  // saves kit being clicked to the localStorage
  saveKit(lego);
}

function saveKit(lego) {
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

function totalAmount(lego) {
  // this function is similar to storage function it adds the total amount to the localStorage
  // and updates the total amount if there is another lego being added.

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

export async function kitStorage() {
  await fetchKits();
  cartReloadPage();
}
