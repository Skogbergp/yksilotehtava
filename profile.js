import * as customers from './customers.js';
import {getRestaurantById} from './restaurants.js';

const userName = document.querySelector('#username');
const userEmail = document.querySelector('#email');
const editButton = document.querySelector('#edit-button');
const profileInfo = document.querySelector('#profile-info');
const suosikkiRavintola = document.querySelector('#suosikkiRavintola');
const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click', async event => {
  event.preventDefault();
  const confirmation = confirm(
    'Oletko varma, että haluat poistaa käyttäjätilisi?'
  );
  if (confirmation) {
    await customers.deleteUserAccount();
    alert('Käyttäjätili poistettu onnistuneesti.');
    window.location.href = 'index.html'; // Redirect to index.html after deletion
  } else {
    alert('Käyttäjätilin poisto peruutettu.');
  }
});

let isEditing = false;

const user = await customers.getUserInfo();

if (user) {
  userName.textContent = user.username;
  userEmail.textContent = user.email;

  const favorite = await getRestaurantById(user.favouriteRestaurant);
  if (favorite) {
    console.log('favorite', favorite.name);
    suosikkiRavintola.textContent = favorite.name;
  }
} else {
  suosikkiRavintola.textContent = 'Ei suosikki ravintolaa';
}

editButton.addEventListener('click', toggleEditMode);

function toggleEditMode(event) {
  event.preventDefault();

  if (isEditing) {
    profileInfo.innerHTML = `
      <p><strong>Käyttäjänimi:</strong> <span id="username">${userName.textContent}</span></p>
      <p><strong>Sähköposti:</strong> <span id="email">${userEmail.textContent}</span></p>
    `;
    editButton.textContent = 'Muokkaa';
    isEditing = false;
  } else {
    profileInfo.innerHTML = '';

    const form = document.createElement('form');
    form.id = 'edit-form';

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Käyttäjänimi:';
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.value = userName.textContent;

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Sähköposti:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.value = userEmail.textContent;

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Salasana:';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Syötä uusi salasana';

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.textContent = 'Tallenna';

    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(saveButton);

    profileInfo.appendChild(form);

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const updatedUser = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      await customers.updateUserInfo(updatedUser);
      alert('Tiedot päivitetty!');
      userName.textContent = updatedUser.username;
      userEmail.textContent = updatedUser.email;
      toggleEditMode(event);
    });

    editButton.textContent = 'Peruuta';
    isEditing = true;
  }
}
