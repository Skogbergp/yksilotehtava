import * as restaurant from './restaurants.js';
import * as map from './map.js';
const restaurantSelect = document.querySelector('#ravintolat');

const restaurants = await restaurant.getRestaurants();

for (const restaurant of restaurants) {
  const option = document.createElement('option');
  option.value = restaurant._id;
  option.textContent = restaurant.name;
  restaurantSelect.appendChild(option);
}

restaurantSelect.addEventListener('change', () => {
  createMenuTable();
  map.addMarker(restaurantSelect.value);
});

createMenuTable();
async function createMenuTable() {
  const menuTable = document.querySelector('#menu-table');
  menuTable.innerHTML = '';
  const dailyMenu = await restaurant.getDailyMenu(restaurantSelect.value, 'fi');
  const menu = dailyMenu.courses;
  for (const item of menu) {
    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const price = document.createElement('td');
    const diets = document.createElement('td');
    name.textContent = item.name;
    price.textContent = item.price;
    diets.textContent = item.diets;
    tr.appendChild(name);
    tr.appendChild(diets);
    tr.appendChild(price);
    menuTable.appendChild(tr);
  }
}
