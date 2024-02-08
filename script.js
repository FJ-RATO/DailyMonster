const nameInput = document.getElementById('name-input');
const suggestionsList = document.getElementById('suggestions-list');
const monsterStats = document.getElementById('monster-stats');
const monsterDataPath = './monsters.json';

// read from a json in the future
const correctMonster = {
        name: "test dummy",
        ac: 15,
        type: "Humanoid (Goblin)",
        size: "Small",
        cr: "1/8",
        str: 9,
        dex: 16,
        con: 12,
        int: 8,
        wis: 11,
        cha: 15,
        bonusAction: true,
        legendaryAction: false
    };

let currentSuggestions = [];
let selectedMonsters = [];

// Event listener click events
nameInput.addEventListener('click', handleInput);

function loadMonsterData(jsonPath) {
  return fetch(jsonPath)
    .then(response => response.json())
    .catch(error => {
      console.error('Error loading JSON data:', error);
      return []; // Return an empty array in case of errors
    });
}

function handleInput() {
  const inputValue = this.value.toLowerCase();

  // Filter monster names starting with the input
  currentSuggestions = monsterData.filter(monster => monster.name.toLowerCase().startsWith(inputValue));

  // Handle empty suggestions
  if (currentSuggestions.length === 0) {
    suggestionsList.style.display = 'none';
  } else {
    // Clear and rebuild suggestions list
    suggestionsList.innerHTML = '';
    currentSuggestions.forEach(monster => {
      const suggestionItem = document.createElement('li');
      suggestionItem.textContent = monster.name;
      suggestionItem.addEventListener('click', function() {
        addMonsterToTable(monster);
        suggestionsList.style.display = 'none';
        selectedMonsters.push(monster); // Add monster object to selected list
      });
      suggestionsList.appendChild(suggestionItem);
    });
    suggestionsList.style.display = 'block'; // Show suggestions
  }
}

function addMonsterToTable(monster) {
  const tableBody = monsterStats.querySelector('tbody');
  const newRow = document.createElement('tr');

  // Populate table cells with monster data using template literals
  newRow.innerHTML = `
    <td>${monster.name}</td>
    <td>${monster.ac}</td>
    <td>${monster.type}</td>
    <td>${monster.size}</td>
    <td>${monster.cr}</td>
    <td>${monster.str}</td>
    <td>${monster.dex}</td>
    <td>${monster.con}</td>
    <td>${monster.int}</td>
    <td>${monster.wis}</td>
    <td>${monster.chr}</td>
    <td>${monster.bonusAction}</td>
    <td>${monster.legendaryAction}</td>
    `;

  tableBody.appendChild(newRow);
}

loadMonsterData(monsterDataPath)
  .then(data => {
    monsterData = data;
    nameInput.addEventListener('click', handleInput);

  });
