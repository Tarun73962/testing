const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {
    resultsDiv.innerHTML = ''; // Clear previous results
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    if (data.meals) {
        data.meals.forEach(meal => {
            displayRecipe(meal);
        });
    } else {
        resultsDiv.innerHTML = '<p>No recipes found.</p>';
    }
}

function displayRecipe(meal) {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';
    
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <a href="${meal.strSource}" target="_blank">View Recipe</a>
    `;
    
    resultsDiv.appendChild(recipeDiv);
}
