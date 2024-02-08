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
nameInput.addEventListener('keyup', handleInput);

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
  
  currentSuggestions = monsterData.filter(monster => monster.name.toLowerCase().startsWith(inputValue));
  
  suggestionsList.innerHTML = '';

  if (currentSuggestions.length > 0) {
    suggestionsList.style.display = 'block';

    // Loop through suggestions
    currentSuggestions.forEach(monster => {
      const suggestionItem = document.createElement('li');
      suggestionItem.textContent = monster.name;

      // Highlight matched characters
      const highlightedName = highlightMatchedCharacters(monster.name, inputValue);
      suggestionItem.innerHTML = highlightedName;

      // Add click event listener for each suggestion
      suggestionItem.addEventListener('click', function() {
        addMonsterToTable(monster);
        suggestionsList.style.display = 'none';
        selectedMonsters.push(monster);
      });

      // Add suggestion item to the list
      suggestionsList.appendChild(suggestionItem);
    });
  } else {
    // Hide suggestions list if no matches
    suggestionsList.style.display = 'none';
  }
}

function highlightMatchedCharacters(text, searchTerm) {
  const regex = new RegExp('(' + searchTerm.replace(/[.*+?^${}()|[\]\\]\\]\n/, '\\$&') + ')', 'gi');
  return text.replace(regex, '<b>$&</b>'); // Wrap matched characters in bold tags
}

function addMonsterToTable(monster) {
  const tableBody = monsterStats.querySelector('tbody');
  const newRow = document.createElement('tr');

  // Populate table cells with monster data using template literals
  newRow.innerHTML = `
    <td>${monster.name}</td>
    <td style="${getBackgroundColor(monster.ac, correctMonster.ac)}">${monster.ac}</td>
    <td style="${getBackgroundColor(monster.type, correctMonster.type)}">${monster.type}</td>
    <td style="${getBackgroundColor(monster.size, correctMonster.size)}">${monster.size}</td>
    <td style="${getBackgroundColor(monster.cr, correctMonster.cr)}">${monster.cr}</td>
    <td style="${getBackgroundColor(monster.str, correctMonster.str)}">${monster.str}</td>
    <td style="${getBackgroundColor(monster.dex, correctMonster.dex)}">${monster.dex}</td>
    <td style="${getBackgroundColor(monster.con, correctMonster.con)}">${monster.con}</td>
    <td style="${getBackgroundColor(monster.int, correctMonster.int)}">${monster.int}</td>
    <td style="${getBackgroundColor(monster.wis, correctMonster.wis)}">${monster.wis}</td>
    <td style="${getBackgroundColor(monster.chr, correctMonster.chr)}">${monster.chr}</td>
    <td style="${getBackgroundColor(monster.bonusAction, correctMonster.bonusAction)}">${monster.bonusAction}</td>
    <td style="${getBackgroundColor(monster.legendaryAction, correctMonster.legendaryAction)}">${monster.legendaryAction}</td>
    `;

  tableBody.appendChild(newRow);
}

function getBackgroundColor(monsterValue, correctValue) {
  if (monsterValue === correctValue) {
    return 'background-color: green;';
  } else {
    return ''; // No background color
  }
}

loadMonsterData(monsterDataPath)
  .then(data => {
    monsterData = data;
    nameInput.addEventListener('click', handleInput);

  });
