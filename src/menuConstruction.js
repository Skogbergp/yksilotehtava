import * as restaurant from './restaurants.js';

const restaurantSelect = document.querySelector('#ravintolat'); // Ensure this is defined
const menuItems = document.querySelector('#menu-items');
const menuHead = document.querySelector('#menu-table thead'); // Updated to match HTML
const menuTable = document.querySelector('#menu-table'); // Ensure this is defined

async function createMenuTable(toggle) {
  if (!menuItems || !menuHead || !restaurantSelect) {
    console.error('Required elements not found.');
    return;
  }

  // Clear the table body and header
  menuItems.innerHTML = '';
  menuHead.innerHTML = '';

  if (toggle) {
    await createDailyMenuTable();
  } else {
    await createWeeklyMenuTable();
  }
}

async function createWeeklyMenuTable() {
  // Clear the table and rebuild the header
  menuItems.innerHTML = '';
  createMenuTableHead(false); // Pass `false` for weekly menu headers

  console.log('menuTable in createWeeklyMenuTable:', menuItems);
  const weekMenu = await restaurant.getWeekMenu(restaurantSelect.value, 'fi');
  console.log('weekMenu:', weekMenu);

  if (!weekMenu || !weekMenu.days) {
    console.error('Invalid weekly menu data.');
    return;
  }

  const menu = weekMenu.days;

  for (const day of menu) {
    const tr = document.createElement('tr');
    const date = document.createElement('td');
    const courses = document.createElement('td');

    date.textContent = day.date;

    // Check if courses exist and map them, otherwise display "No courses available"
    courses.textContent =
      day.courses && day.courses.length > 0
        ? day.courses.map(course => course.name).join(', ')
        : 'No courses available';

    tr.appendChild(date);
    tr.appendChild(courses);
    menuItems.appendChild(tr);
  }

  // Append the menuItems (tbody) to the menuTable (table) if not already appended
  if (!menuTable.contains(menuItems)) {
    menuTable.appendChild(menuItems);
  }
}

async function createDailyMenuTable() {
  // Clear the table and rebuild the header
  menuItems.innerHTML = '';
  createMenuTableHead(true); // Pass `true` for daily menu headers

  console.log('menuTable in createDailyMenuTable:', menuItems);
  const dailyMenu = await restaurant.getDailyMenu(restaurantSelect.value, 'fi');

  if (!dailyMenu || !dailyMenu.courses) {
    console.error('Invalid daily menu data.');
    return;
  }

  const menu = dailyMenu.courses;
  console.log('menu:', menu);
  for (const item of menu) {
    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const price = document.createElement('td');
    const diets = document.createElement('td');

    name.textContent = item.name;
    price.textContent = item.price || 'N/A'; // Handle missing price
    diets.textContent = item.diets ? item.diets.join(', ') : 'N/A'; // Handle missing diets

    tr.appendChild(name);
    tr.appendChild(diets);
    tr.appendChild(price);
    menuItems.appendChild(tr);
  }

  // Append the menuItems (tbody) to the menuTable (table) if not already appended
  if (!menuTable.contains(menuItems)) {
    menuTable.appendChild(menuItems);
  }
}

function createMenuTableHead(toggle) {
  menuHead.innerHTML = ''; // Clear the table header
  const menuHeadRow = document.createElement('tr');

  if (toggle) {
    // Daily menu headers
    const nameHead = document.createElement('th');
    const dietsHead = document.createElement('th');
    const priceHead = document.createElement('th');

    nameHead.textContent = 'Ruoka'; // Matches HTML
    dietsHead.textContent = 'ruokavaliot'; // Matches HTML
    priceHead.textContent = 'Hinta'; // Matches HTML

    menuHeadRow.appendChild(nameHead);
    menuHeadRow.appendChild(dietsHead);
    menuHeadRow.appendChild(priceHead);
  } else {
    // Weekly menu headers
    const dateHead = document.createElement('th');
    const coursesHead = document.createElement('th');

    dateHead.textContent = 'Päivämäärä'; // "Date" in Finnish
    coursesHead.textContent = 'Ruokalajit'; // "Courses" in Finnish

    menuHeadRow.appendChild(dateHead);
    menuHeadRow.appendChild(coursesHead);
  }

  menuHead.appendChild(menuHeadRow);

  // Append the menuHead (thead) to the menuTable (table) if not already appended
  if (!menuTable.contains(menuHead)) {
    menuTable.appendChild(menuHead);
  }
}

export {
  createMenuTable,
  createWeeklyMenuTable,
  createDailyMenuTable,
  createMenuTableHead,
};
