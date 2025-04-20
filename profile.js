import * as userFetch from 'customers.js';

const userName = document.querySelector('#username');
const userEmail = document.querySelector('#email');

user = await userFetch.getUserData();

if (user) {
  userName.textContent = user.username;
  userEmail.textContent = user.email;
}
