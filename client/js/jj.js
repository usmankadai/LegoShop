// There are some similar functions between individualBricks and individualKits,
// it is more efficient to have the similar codes in a separate file and export it to
// any file that is needed


export function detail(details) {
  const image = document.querySelector('.kitIn');
  image.src = `${details.legoImage}`;
  image.alt = `${details.legoName}`;

  const price = document.querySelector('.legoPrice');
  price.textContent = `£${details.price}`;
  if (details.price < 1) {
    // check if the price is less than £1, get rid of the first two characters which is 0 and point.
    price.textContent = `${price.price}`.slice(2) + 'p';
  }
  const stock = document.querySelector('.stock');
  stock.textContent = `Stock: ${details.stock}`;

  const category = document.querySelector('.category');
  category.textContent = `Category: ${details.category}`;

  const description = document.querySelector('.description');
  description.textContent = `${details.legoName}`;
}


// after reloading the page the number of items in the cart should not disappear.
// It should be the same as the items in localStorage
export function cartReloadPage() {
  const cartItems = localStorage.getItem('cartQuantity');
  if (cartItems) {
    document.querySelector('#cart').textContent = cartItems;
  }
}
