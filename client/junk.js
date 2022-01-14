// i keep junk codes here incase i need it for the future. Here are some paradigms i used before correction during drop in





// export function templateMain() {
//     const selectFooter = document.querySelector('main');
//     const createDiv = document.createElement('div');
//     createDiv.className = 'mainLinks';
//     selectFooter.append(createDiv);

//     const mainLinks = document.querySelector('.mainLinks');
//     const createUl = document.createElement('ul');
//     createUl.className = 'legoList';
//     mainLinks.append(createUl);

//     let makeID = 0;
//     for (let i = 1; i <= 20; i += 1) {
//         makeID++;
//         const createLi = document.createElement('li');
//         const createLis = document.createElement('div');

//         createLis.className = 'legoDiv';
//         createLis.id = `lego${makeID}`;

//         const createA = document.createElement('a');
//         createA.id = `a${makeID}`;
//         createA.href = `#/Brick/${makeID}`;

//         const legoName = document.createElement('div');
//         legoName.className = 'legoName';

//         const legoPrice = document.createElement('div');
//         legoPrice.className = 'legoPrice';
//         legoPrice.id = `legoPrice${makeID}`;

//         const legoNameLink = document.createElement('a');
//         legoNameLink.className = 'legoNameLink';
//         legoNameLink.id = `legoLink${makeID}`;
//         legoNameLink.href = `#/Brick/${makeID}`;

//         const createImg = document.createElement('img');
//         createImg.id = `image${makeID}`;

//         legoName.append(legoNameLink);
//         createA.append(createImg);
//         createLis.append(createA, legoName, legoPrice);
//         createLi.append(createLis);
//         createUl.append(createLi);
//     }
// }

// export function inventories() {
//     const selectImgElement = document.querySelector('img');
//     // const selectlegoLink = document.querySelector('#legoNameLink');

//     legoLink1.textContent = 'Chrome Gold Brick';
//     legoPrice1.textContent = '£370';
//     image1.src = 'images/usedInventories/chromeGold.png';
//     image1.alt = 'Chrome Gold Brick';

//     legoLink2.textContent = 'Pink Brick';
//     legoPrice2.textContent = '£200';
//     image2.src = 'images/usedInventories/pink.png';
//     image2.alt = 'Pink Brick';

//     legoLink3.textContent = 'Green Brick';
//     legoPrice3.textContent = '£180';
//     image3.src = 'images/usedInventories/green.png';
//     image3.alt = 'Green Brick';

//     legoLink4.textContent = 'Orange Brick';
//     legoPrice4.textContent = '£200';
//     image4.src = 'images/usedInventories/orange.png';
//     image4.alt = 'Orange Brick';

//     legoLink5.textContent = 'Purple Brick';
//     legoPrice5.textContent = '£160';
//     image5.src = 'images/usedInventories/purple.png';
//     image5.alt = 'Purple Brick';

//     legoLink6.textContent = 'Reddish Lilac Brick';
//     legoPrice6.textContent = '£280';
//     image6.src = 'images/usedInventories/reddishLilac.png';
//     image6.alt = 'Reddish Lilac Brick';

//     legoLink7.textContent = 'Brown Brick';
//     legoPrice7.textContent = '£160';
//     image7.src = 'images/usedInventories/brown.png';
//     image7.alt = 'Brown Brick';

//     legoLink8.textContent = 'Yellow Brick';
//     legoPrice8.textContent = '£200';
//     image8.src = 'images/usedInventories/yellow.png';
//     image8.alt = 'Yellow Brick';

//     legoLink9.textContent = 'Blue Brick';
//     legoPrice9.textContent = '£200';
//     image9.src = 'images/usedInventories/blue.png';
//     image9.alt = 'Blue Brick';

//     legoLink10.textContent = 'Aqua Brick';
//     legoPrice10.textContent = '£300';
//     image10.src = 'images/usedInventories/aqua.png';
//     image10.alt = 'Aqua Brick';
    
//     legoLink11.textContent = 'Red Brick';
//     legoPrice11.textContent = '£155';
//     image11.src = 'images/usedInventories/red.png';
//     image11.alt = 'Red Brick';

//     legoLink12.textContent = 'White Brick';
//     legoPrice12.textContent = '£300';
//     image12.src = 'images/usedInventories/white.png';
//     image12.alt = 'White Brick';

//     legoLink13.textContent = 'Soldier';
//     legoPrice13.textContent = '£640';
//     image13.src = 'images/usedInventories/greenkit.png';
//     image13.alt = 'Pink Brick';

//     legoLink14.textContent = `Soldier's Armour`;
//     legoPrice14.textContent = '£300';
//     image14.src = 'images/usedInventories/greenChest.png';
//     image14.alt = `Soldier's Armour`;

//     legoLink15.textContent = 'Left Arm';
//     legoPrice15.textContent = '£120';
//     image15.src = 'images/usedInventories/greenLeftArm.png';
//     image15.alt = 'Right Arm';

//     legoLink16.textContent = 'Right Arm';
//     legoPrice16.textContent = '£120';
//     image16.src = 'images/usedInventories/greenRightArm.png';
//     image16.alt = 'Right Arm';

//     legoLink17.textContent = 'Hand';
//     legoPrice17.textContent = '£100';
//     image17.src = 'images/usedInventories/greenHand.png';
//     image17.alt = 'Hand';

//     legoLink18.textContent = 'Bike';
//     legoPrice18.textContent = '£600';
//     image18.src = 'images/usedInventories/yellowBike.png';
//     image18.alt = 'Bike';

//     legoLink19.textContent = `Bike's Body`;
//     legoPrice19.textContent = '£450';
//     image19.src = 'images/usedInventories/bikeBrick.png';
//     image19.alt = `Bike's Body`;

//     legoLink20.textContent = 'Tire';
//     legoPrice20.textContent = '£150';
//     image20.src = 'images/usedInventories/tire.png';
//     image20.alt = 'Tire';
//     // selectImgElement.append(image1.src);
// }