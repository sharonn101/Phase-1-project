function searchCocktails() {
const searchTerm = document.getElementById('search-header').value;

    // Remove previous results if they exist
const existingResults = document.getElementById('results');
    if (existingResults) {
        existingResults.remove();
    }

    if (searchTerm === '') return;

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTerm)
.then(resp => resp.json())
.then(data => {
    const drinks = data.drinks;

    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';
    resultsContainer.classList.add('recipe-container'); // reuse styling

    // Insert results above recipe cards
    const mainContainer = document.querySelector('.background');
    const recipeCards = document.querySelector('.recipe-container');
    mainContainer.insertBefore(resultsContainer, recipeCards);

    if (drinks) {
    drinks.forEach(drink => {
        const drinkDiv = document.createElement('div');
        drinkDiv.className = 'recipe-card';
        drinkDiv.innerHTML = `
            <h2>${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="200">
            <p>${drink.strInstructions}</p>`;
        resultsContainer.appendChild(drinkDiv);
        });
    } else {
        resultsContainer.innerHTML = '<p>No drinks found.</p>';
    }
    });
}

// Run on button click
document.getElementById('header-button').addEventListener('click', function(e) {
    e.preventDefault();
    searchCocktails();
});
