import * as restaurant from './restaurants.js';
import * as map from './map.js';
import * as menus from './menuConstruction.js';

const restaurantSelect = document.querySelector('#ravintolat');
const toggleButton = document.querySelector('#menu-toggle');

let menuToggle = true; // true for daily menu, false for weekly menu

// Set initial button text
toggleButton.textContent = menuToggle
  ? 'päivän ruokalista'
  : 'viikon ruokalista';

toggleButton.addEventListener('click', () => {
  menuToggle = !menuToggle; // Toggle the state
  menus.createMenuTable(menuToggle); // Update the menu table based on the toggle state

  // Update button text based on the toggle state
  toggleButton.textContent = menuToggle
    ? 'päivän ruokalista'
    : 'viikon ruokalista';
});

const restaurants = await restaurant.getRestaurants();

for (const restaurant of restaurants) {
  const option = document.createElement('option');
  option.value = restaurant._id;
  option.textContent = restaurant.name;
  restaurantSelect.appendChild(option);
  map.addMarker(restaurant._id);
}

restaurantSelect.addEventListener('change', async () => {
  menus.createMenuTable(menuToggle); // Update the menu table when the restaurant changes

  const selectedRestaurantId = restaurantSelect.value;
  const selectedRestaurant = await restaurant.getRestaurantById(
    selectedRestaurantId
  );

  if (selectedRestaurant && selectedRestaurant.location) {
    const lat = selectedRestaurant.location.coordinates[1];
    const lon = selectedRestaurant.location.coordinates[0];
    map.moveToLocation(lat, lon);
  } else {
    console.error('Invalid restaurant data or location.');
  }
});
