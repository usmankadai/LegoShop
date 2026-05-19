import * as auth0 from './auth0.mjs';

export function createEditButton(lego, container, type) {
  const btn = document.createElement('button');
  btn.className = 'editBrick emptyCart';
  btn.innerHTML = '<i class="fas fa-edit"></i> Edit';
  btn.addEventListener('click', () => showEditForm(lego, container, btn, type));
  container.append(btn);
}

function showEditForm(lego, container, editBtn, type) {
  editBtn.style.display = 'none';

  const nameLink = document.getElementById(`legoLink${lego.legoId}`);
  const priceEl  = document.getElementById(`legoPrice${lego.legoId}`);

  const form = document.createElement('div');
  form.className = 'editForm';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'editInput';
  nameInput.value = lego.legoName;
  nameInput.placeholder = 'Name';

  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.className = 'editInput';
  priceInput.value = lego.price;
  priceInput.placeholder = 'Price';
  priceInput.min = '0.01';
  priceInput.step = '0.01';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'saveEdit';
  saveBtn.textContent = 'Save';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'cancelEdit';
  cancelBtn.textContent = 'Cancel';

  form.append(nameInput, priceInput, saveBtn, cancelBtn);

  nameLink.style.display = 'none';
  priceEl.style.display  = 'none';
  container.insertBefore(form, editBtn);

  function restore() {
    form.remove();
    nameLink.style.display = '';
    priceEl.style.display  = '';
    editBtn.style.display  = '';
  }

  cancelBtn.addEventListener('click', restore);

  saveBtn.addEventListener('click', async () => {
    const newName  = nameInput.value.trim();
    const newPrice = Number(priceInput.value);

    if (!newName)              return alert('Name cannot be empty.');
    if (!newPrice || newPrice <= 0) return alert('Enter a valid price.');

    saveBtn.textContent = 'Saving…';
    saveBtn.disabled    = true;

    const res = await fetch(`/${type}/${lego.legoId}`, {
      method:  'PUT',
      headers: {
        'Content-Type':  'application/json',
        'x-admin-email': auth0.getAdminEmail(),
      },
      body: JSON.stringify({ legoName: newName, price: newPrice }),
    });

    if (res.ok) {
      lego.legoName = newName;
      lego.price    = newPrice;
      nameLink.textContent = newName;
      priceEl.textContent  = newPrice < 1 ? `${newPrice}p`.slice(2) : `£${newPrice}`;
    } else {
      alert('Failed to save. Please try again.');
    }

    restore();
  });
}
