import * as restaurantModule from './restaurants.js';
navigator.geolocation.getCurrentPosition(success, error);

var map = L.map('map');

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
}
function moveToLocation(lat, lon) {
  map.setView([lat, lon], 13);
}

function error() {
  console.log('Error getting location');
}
function success(position) {
  const coords = position.coords;
  const lat = coords.latitude;
  const lon = coords.longitude;
  moveToLocation(lat, lon);
}
export {addMarker, moveToLocation};
