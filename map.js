import * as restaurantModule from './restaurants.js';

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function addMarker(id) {
  const restaurantData = await restaurantModule.getRestaurantById(id);
  const lat = restaurantData.location.coordinates[1];
  const lon = restaurantData.location.coordinates[0];
  const name = restaurantData.name;
  const marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup(name);
  marker.openPopup();
  map.setView([lat, lon], 13);
}

export {addMarker};
