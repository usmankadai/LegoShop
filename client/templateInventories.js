// import inventories from './brickAndKitData.js';

export async function createInventory() {
  // const { legos } = inventories;
  const response = await fetch('http://localhost:8080/legos/inventories', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response || !response.ok) {
    response.sendStatus(404);
    return;
    // const error = document.createElement('div');
    // error.textContent = 'We have a problem creating inventory -_-';
  }
  const legos = await response.json();

  const selectMain = document.getElementById('tempMain');
  const createDiv = document.createElement('div');
  createDiv.className = 'mainLinks';
  selectMain.append(createDiv);

  legos.forEach(lego => {
    const mainLinks = document.querySelector('.mainLinks');
    const createLi = document.createElement('li');
    const createLis = document.createElement('div');

    createLis.className = 'legoDiv';
    createLis.id = `lego${lego.legoId}`;

    const createA = document.createElement('a');
    createA.id = `a${lego.legoId}`;
    createA.href = `#/${lego.category}/${lego.legoId}`;
    // createA.href = `#/${lego.category}/${lego.name}`;

    const legoName = document.createElement('div');
    legoName.className = 'legoName';

    const legoPrice = document.createElement('div');
    legoPrice.className = 'legoPrice';
    legoPrice.id = `legoPrice${lego.legoId}`;
    legoPrice.textContent = `£${lego.price}`;

    const addToCart = document.createElement('button');
    addToCart.className = 'addToCart';
    addToCart.textContent = 'Add to Cart';

    const legoNameLink = document.createElement('a');
    legoNameLink.className = 'legoNameLink';
    legoNameLink.id = `legoLink${lego.legoId}`;
    legoNameLink.textContent = `${lego.name}`;
    legoNameLink.href = `#/${lego.category}/${lego.legoId}`;
    // legoNameLink.href = `#/${lego.category}/${lego.name}`;

    const createImg = document.createElement('img');
    createImg.id = `image${lego.legoId}`;
    createImg.src = `${lego.image}`;
    createImg.alt = `#${lego.name}`;

    legoName.append(legoNameLink);
    createA.append(createImg);
    createLis.append(createA, legoName, legoPrice, addToCart);
    createLi.append(createLis);
    mainLinks.append(createLi);
  });
}

// function le() {
//   // const selectLego = document.querySelector('.legoDiv');
//   const doc = document.createHTMLDocument('Lego Page');
//   const p = doc.createElement('p');
//   p.textContent = 'This is a new paragraph.';
// }

// export function createLe() {
//   document.querySelector('.legoDiv').addEventListener('click', le());
// }
