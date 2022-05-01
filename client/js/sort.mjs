export function sort() {
  let sorting = 0;
  const selectSort = document.querySelector('#sort');
  for (let i = 1; i <= 20; i += 1) {
    const log = document.createElement('option');
    sorting++;
    log.id = `sort${sorting}`;
    selectSort.append(log);
  }

  const sort1 = document.getElementById('sort1');
  sort1.textContent = 'All';

  const sort2 = document.getElementById('sort2');
  sort2.textContent = '1x1';

  const sort3 = document.getElementById('sort3');
  sort3.textContent = '1x2';

  const sort4 = document.getElementById('sort4');
  sort4.textContent = '2x2';

  const sort5 = document.getElementById('sort5');
  sort5.textContent = '2x3';

  const sort6 = document.getElementById('sort6');
  sort6.textContent = 'Gold';

  const sort7 = document.getElementById('sort7');
  sort7.textContent = 'Red';

  const sort8 = document.getElementById('sort8');
  sort8.textContent = 'Aqua';

  const sort9 = document.getElementById('sort9');
  sort9.textContent = 'Pink';

  const sort10 = document.getElementById('sort10');
  sort10.textContent = 'Green';

  const sort11 = document.getElementById('sort11');
  sort11.textContent = 'Orange';

  const sort12 = document.getElementById('sort12');
  sort12.textContent = 'Lilac';

  const sort13 = document.getElementById('sort13');
  sort13.textContent = 'Brown';

  const sort14 = document.getElementById('sort14');
  sort14.textContent = 'Yellow';

  const sort15 = document.getElementById('sort15');
  sort15.textContent = 'Blue';

  const sort16 = document.getElementById('sort16');
  sort16.textContent = 'White';

  const sort17 = document.getElementById('sort17');
  sort17.textContent = 'Purple';

  const sort18 = document.getElementById('sort18');
  sort18.textContent = '£1-£10';

  const sort19 = document.getElementById('sort19');
  sort19.textContent = '£11-£20';

  const sort20 = document.getElementById('sort20');
  sort20.textContent = '>£20';
}
