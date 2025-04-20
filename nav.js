import {logoutUser} from './customers.js';
function createNavBar() {
  const nav = document.querySelector('.nav');

  // Create and append "Etusivu" link
  const homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.textContent = 'Etusivu';
  nav.appendChild(homeLink);

  // Create and append "Profile" link
  const profileLink = document.createElement('a');
  profileLink.href = 'profile.html';
  profileLink.textContent = 'Profile';
  nav.appendChild(profileLink);

  // Create and append "Luo käyttäjä" or "Kirjaudu ulos" links based on login status
  if (localStorage.getItem('token')) {
    const logoutLink = document.createElement('a');
    logoutLink.href = '';
    logoutLink.textContent = 'Kirjaudu ulos';
    logoutLink.addEventListener('click', () => {
      logoutUser();
      window.location.href = 'index.html'; // Redirect to index.html after logout{
    });
    nav.appendChild(logoutLink);
  } else {
    const registerLink = document.createElement('a');
    registerLink.href = 'registerForm.html';
    registerLink.textContent = 'Luo käyttäjä';
    nav.appendChild(registerLink);

    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.textContent = 'Kirjaudu';
    nav.appendChild(loginLink);
  }

  if (window.location.pathname.endsWith('index.html')) {
    // Create and append the dropdown menu
    const select = document.createElement('select');
    select.name = 'ravintolat';
    select.id = 'ravintolat';
    nav.appendChild(select);

    // Conditionally create and append the button only on index.html
    const button = document.createElement('button');
    button.id = 'menu-toggle';
    button.value = 'daily';
    button.textContent = 'Toggle Menu';
    nav.appendChild(button);
  }
}

// Call the function to create the navigation bar
createNavBar();
