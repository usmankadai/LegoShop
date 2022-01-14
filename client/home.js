import inventories from './brickAndKitData.js';

// static home page

export function templateHeader() {

    const selectH1 = document.querySelector('header');

    const log = document.createElement('a');
    log.id = 'logo';
    log.className = 'Lego'
    log.href = '#';
    log.textContent = 'LEGO';

    const menu = document.createElement('div');
    menu.id = 'menu';
    menu.className = 'fas fa-bars';

    const navBar = document.createElement('nav');
    navBar.className = 'navBar';
    selectH1.append(menu, log, navBar);

    let nav = 0;
    const selectNav = document.querySelector('.navBar');
        for (let i = 1; i <= 4; i += 1) {
        const log = document.createElement('a');
        nav++;
        log.id = `navButton${nav}`;
        selectNav.append(log);
    }

    const selectNav1 = document.querySelector('#navButton1, #navButton2, #navButton3, #navButton4');
    navButton1.id = 'home';
    home.href = '#home';
    home.textContent = 'Home';
    
    navButton2.id = 'bricks';
    bricks.href = '#Bricks';
    bricks.textContent = 'Bricks';

    navButton3.id = 'kits';
    kits.href = '#Kits';
    kits.textContent = 'Kits';

    navButton4.id = 'review';
    review.href = '#Review';
    review.textContent = 'Review';

    const iconsDiv = document.createElement('div');
    iconsDiv.className = 'icons';
    selectH1.append(iconsDiv);

    const selectIcon = document.querySelector('.icons');
    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Search items...';
    selectIcon.append(searchInput);

    for (let i = 1; i <= 4; i += 1) {
    const log = document.createElement('a');
    nav++;
    log.id = `icon${nav}`;
    selectIcon.append(log);
    }

    const sle = document.querySelector('#icon5, #icon6, #icon7, #icon8');

    icon5.id = 'search';
    search.href = '#search';
    search.className = 'fas fa-search';

    icon6.id = 'favorite';
    favorite.href = '#favorite';
    favorite.className = 'fas fa-heart';

    icon7.id = 'cart';
    cart.href = '#cart';
    cart.className = 'fas fa-shopping-cart';

    icon8.id = 'user';
    user.href = '#user';
    user.className = 'fas fa-user';
}

export function templateFooter() {
    const selectFooter = document.querySelector('footer');
    const createDiv = document.createElement('div');
    createDiv.className = 'footerLinks';
    selectFooter.append(createDiv);

    const footerLinks = document.querySelector('.footerLinks');
    const createFirstLink = document.createElement('h3');
    createFirstLink.textContent = 'About us';
    footerLinks.append(createFirstLink);
}







export function createInventory(){ 
    const {legos} = inventories;
    const selectFooter = document.getElementById('tempMain');
    const createDiv = document.createElement('div');
    createDiv.className = 'mainLinks';
    selectFooter.append(createDiv);

    const mainLinks = document.querySelector('.mainLinks');
    const createUl = document.createElement('ul');
    createUl.className = 'legoList';
    mainLinks.append(createUl);

    legos.forEach(lego => {
        const selectUl = document.querySelector('.legoList');
        const createLi = document.createElement('li');
        const createLis = document.createElement('div');

        createLis.className = 'legoDiv';
        createLis.id = `lego${lego.legoId}`;

        const createA = document.createElement('a');
        createA.id = `a${lego.legoId}`;
        createA.href = `#/Brick/${lego.legoId}`;

        const legoName = document.createElement('div');
        legoName.className = 'legoName';

        const legoPrice = document.createElement('div');
        legoPrice.className = 'legoPrice';
        legoPrice.id = `legoPrice${lego.legoId}`;
        legoPrice.textContent = `£${lego.price}`;

        const legoNameLink = document.createElement('a');
        legoNameLink.className = 'legoNameLink';
        legoNameLink.id = `legoLink${lego.legoId}`;
        legoNameLink.textContent = `${lego.name}`;
        legoNameLink.href = `#/Brick/${lego.legoId}`;

        const createImg = document.createElement('img');
        createImg.id = `image${lego.legoId}`;
        createImg.src = `${lego.image}`;
        createImg.alt = `#${lego.name}`;

        legoName.append(legoNameLink);
        createA.append(createImg);
        createLis.append(createA, legoName, legoPrice);
        createLi.append(createLis);
        selectUl.append(createLi);
    })
}









// export function createInventory(){ 
//     const {legos} = inventories;

// return `
// <ul class="legoList">
//     ${legos.map(lego => `
//         <li>
//             <div class="legoDiv" id="lego${lego.legoId}">
//                 <a href="#/Brick/${lego.legoId}">
//                 <img id="image${lego.legoId}" src="${lego.image}" alt="${lego.name}">
//                 </a>
//                 <div class="legoName">
//                     <a class="legoNameLink" href="#/Brick/${lego.legoId}">${lego.name}</a>
//                 </div>
//                 <div class="legoPrice">£${lego.price}</div>
//             </div>
//         </li>`
//     ).join('\n')}
// </ul>`;

// }

