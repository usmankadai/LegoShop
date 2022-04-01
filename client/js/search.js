export async function search() {
  const response = await fetch('/bricks', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response || !response.ok) {
    response.sendStatus(404);
    return;
  }

  const legos = await response.json();

  //   const filter = legos.filter(lego => {
  // const searchSites = document.querySelector('#searchSite').value;
  //     // if (lego.name === 'Pink Brick') {
  //     //   return true;
  //     // }
  //   });
  const searchSite = document.querySelector('#search');

  searchSite.addEventListener('click', () => {
    const filter = legos.filter(lego => {
      if (lego.name === 'Pink Brick') {
        return true;
      }
    });
    console.log(filter);
  });

  //   const sort = document.querySelector('#sort');
  // //   const haha = sort.options[sort.selectedIndex].value = 'a2z';
  // //   console.log(haha);
  // //   sort.target.value = 'a2z';
  //   sort.addEventListener('change', () => {
  //     const filter = legos.sort(lego => {
  //       if (lego.name === 'Pink Brick') {
  //         return true;
  //       }
  //     });
  //     console.log(filter);
  //     const s = legos.sort(function (a, b) {
  //         if(a.name > b.name) {
  //             return 1;
  //         } else {
  //             return -1;
  //         }
  //     });
  //     console.log(s);
  //   });

//   const filter = legos.filter(lego => {
//     if (lego.name === 'Pink Brick') {
//       return true;
//     }
//   });
}

// function fil() {
//   const searchSite = document.querySelector('#searchSite').value.toUpperCase();
//   console.log(searchSite);


//   // const getBrick = document.querySelector('.mainLinks');

//   // const dataset = getBrick.querySelectorAll(`[data-set="${3}"]`);
//   // console.log(dataset);

//   // for (let i = 0; i < dataset.length; i++) {
//   //     const name = dataset[i].querySelector('.legoNameLink')[0];
//   //     if (name.textContent.toUpperCase().indexOf(searchSite) > -1){
//   //         dataset[i].style.display = '';
//   //     }else{
//   //         dataset[i].style.display = 'none';
//   //     }
//   // }
// }


// const response = await fetch('/bricks', {
//     headers: {
//       'Content-type': 'application/json',
//     },
//   });
//   if (!response || !response.ok) {
//     response.sendStatus(404);
//     return;
//   }

//   const legos = await response.json();

//   const filter = legos.filter(lego => {
//     if (lego.name === 'Pink Brick') {
//       return true;
//     }
//   });
//   console.log(filter);
