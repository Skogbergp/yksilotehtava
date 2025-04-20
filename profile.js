import * as customers from './customers.js';

const userName = document.querySelector('#username');
const userEmail = document.querySelector('#email');

console.log('username', userName);
console.log('email', userEmail);

const user = await customers.getUserInfo();

if (user) {
  userName.textContent = user.username;
  userEmail.textContent = user.email;
}
