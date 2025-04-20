import * as restaurantModule from './restaurants.js';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

navigator.geolocation.getCurrentPosition(success, error, options);
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

  // Move the map to the user's location
  moveToLocation(lat, lon);

  // Add a red dot for "You are here"
  const redDot = L.circleMarker([lat, lon], {
    radius: 8, // Size of the dot
    color: 'red', // Border color
    fillColor: 'red', // Fill color
    fillOpacity: 0.8, // Opacity of the fill
  }).addTo(map);

  redDot.bindPopup('You are here').openPopup(); // Add a popup to the red dot
}
function closestRestaurant(lat, lon) {
  const restaurants = restaurantModule.getRestaurants();
  let closest = null;
  let minDistance = Infinity;

  for (const restaurant of restaurants) {
    const restLat = restaurant.location.coordinates[1];
    const restLon = restaurant.location.coordinates[0];
    const distance = Math.sqrt(
      Math.pow(lat - restLat, 2) + Math.pow(lon - restLon, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closest = restaurant;
    }
  }

  return closest;
}
export {addMarker, moveToLocation};
