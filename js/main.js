const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = ' ';
const APP_ID = '6c88a385';
const APP_Key = '5b71edf4e2ad33d2c78b7b26e4d6cd73';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  console.log(searchQuery);
  fetchAPI();
});

async function fetchAPI () {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML (data.hits);
  console.log(data.hits);
}
function generateHTML (results){
  container.classList.remove('initial');
  let generatedHTML = ' ';
  results.map((result) => {
    generatedHTML += 
    `<div class="item">
      <img src="${result.recipe.image}" alt="picture of food">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
           <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
         <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
         <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels.length : "No data Found"}</p>
         <p class="item-data">Heath Label: ${result.recipe.healthLabels}</p>
         </div>
    `
  })
  searchResultDiv.innerHTML = generatedHTML;
}
