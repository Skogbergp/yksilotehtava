import {addFavoriteRestaurant} from './customers.js';
import {fetchData} from './fetchData.js';

const url = 'https://media2.edu.metropolia.fi/restaurant/api/v1/';

async function getRestaurants() {
  try {
    return await fetchData(url + 'restaurants');
  } catch (error) {
    console.log(error);
  }
}
async function getRestaurantById(id) {
  try {
    return await fetchData(url + 'restaurants/' + id);
  } catch (error) {
    console.log(error);
  }
}
async function getWeekMenu(id, lang) {
  try {
    return await fetchData(url + 'restaurants/weekly/' + id + '/' + lang);
  } catch (error) {
    console.log(error);
  }
}
async function getDailyMenu(id, lang) {
  try {
    return await fetchData(url + 'restaurants/daily/' + id + '/' + lang);
  } catch (error) {
    console.log(error);
  }
}
async function filterByCity() {
  const restaurants = getRestaurants();
  const city = document.getElementById('city').value;
}

export {
  getRestaurants,
  getRestaurantById,
  getWeekMenu,
  getDailyMenu,
  filterByCity,
};
