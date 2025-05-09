import {fetchData} from './fetchData.js';

const url = 'https://media2.edu.metropolia.fi/restaurant/api/v1/';
const authUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1/auth/';
const registerButton = document.querySelector('#register-button');
const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#logout-button');
if (loginButton) {
  loginButton.addEventListener('click', event => loginUser(event));
}
if (logoutButton) {
  logoutButton.addEventListener('click', event => logoutUser(event));
}
if (registerButton) {
  registerButton.addEventListener('click', event => registerUser(event));
}
function registerUser(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;

  fetchData(url + 'users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  });
}

async function loginUser(event) {
  event.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const loginData = {
    username: username,
    password: password,
  };
  const response = await fetchData(authUrl + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  console.log('response', response);

  if (response) {
    const token = response.token;
    console.log('token', token);
    localStorage.setItem('token', token);
    console.log('User logged in successfully');
    // Redirect to the profile page or any other page
    window.location.href = 'index.html'; // Change this to the desired page
  } else {
    console.error('Login failed');
  }
}
function logoutUser() {
  // Clear the token from local storage
  localStorage.removeItem('token');
  console.log('User logged out successfully');
  //TODO: implement user logout logic
}
async function getUserInfo() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found. User is not logged in.');
    return;
  }
  const response = await fetchData(url + 'users/token', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response) {
    console.log('User info retrieved successfully');
    return response;
  } else {
    console.error('Failed to retrieve user info');
  }
  return response;
}
function updateUserInfo(user) {
  console.log('user', user);

  const username = user.username;
  const email = user.email;
  const password = user.password;
  fetchData(url + 'users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
}
function deleteUserAccount() {
  try {
    fetchData(url + 'users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error deleting user account:', error);
  }
  console.log('User account deleted successfully');
}

function addFavoriteRestaurant(id) {
  fetchData(url + 'users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      favouriteRestaurant: id,
    }),
  });
  //TODO: implement add favorite restaurant logic
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserInfo,
  deleteUserAccount,
  addFavoriteRestaurant,
};
