

function searchCocktails() {
const searchTerm = document.getElementById('search-header').value;

const existingResults = document.getElementById('results');
    if (existingResults) {
        existingResults.remove();
    }

    if (searchTerm === '') return;

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTerm)
.then(resp => resp.json())
.then(data => {
    const drinks = data.drinks;

    const searchHeading = document.createElement('h1');
    searchHeading.id = 'search-heading';
    searchHeading.textContent = `Search Results for "${searchTerm}"`;

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';
    resultsContainer.classList.add('recipe-container');
    resultsContainer.appendChild(searchHeading);

    const mainContainer = document.querySelector('#background');
    const intro = document.querySelector('.intro');
    mainContainer.insertBefore(resultsContainer, intro);

    if (drinks) {
    drinks.forEach(drink => {
        const drinkDiv = document.createElement('div');
        drinkDiv.className = 'recipe-card';
        drinkDiv.innerHTML = `
            <h2>${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="200">
            <p><strong>Category:</strong> ${drink.strCategory}</p>
            <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
            <p><strong>Glass:</strong> ${drink.strGlass}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                ${Object.keys(drink).filter(key => key.startsWith('strIngredient') && drink[key])
                    .map(key => `<li>${drink[key]} - ${drink[`strMeasure${key.slice(-1)}`] || ''}</li>`).join('')}
            </ul>
            <p>${drink.strInstructions}</p>`;

        resultsContainer.appendChild(drinkDiv);
        });
    } else {
        resultsContainer.innerHTML = '<p>No drinks found.</p>';
    }
    });
}

document.getElementById('header-button').addEventListener('click', function(e) {
    e.preventDefault();
    searchCocktails();
});


function surpriseMe() {
    // Remove previous results
    const existingResults = document.getElementById('results');
    if (existingResults) {
        existingResults.remove();
    }

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
.then(resp => resp.json())
.then(data => {
    const drink = data.drinks[0]; // Only one drink returned

    const searchHeading = document.createElement('h1');
    searchHeading.id = 'search-heading';
    searchHeading.textContent = `Here's a Random Cocktail for You 🍹`;

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';
    resultsContainer.classList.add('recipe-container');
    resultsContainer.appendChild(searchHeading);

    const drinkDiv = document.createElement('div');
    drinkDiv.className = 'recipe-card';
    drinkDiv.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="200">
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
        <p><strong>Glass:</strong> ${drink.strGlass}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
            ${Object.keys(drink)
            .filter(key => key.startsWith('strIngredient') && drink[key])
            .map(key => {
                const index = key.replace('strIngredient', '');
                const measure = drink[`strMeasure${index}`] || '';
                return `<li>${drink[key]} - ${measure}</li>`;
            }).join('')}
        </ul>
        <p>${drink.strInstructions}</p>`;

    resultsContainer.appendChild(drinkDiv);

    const mainContainer = document.querySelector('#background');
    const intro = document.querySelector('.intro');
    mainContainer.insertBefore(resultsContainer, intro);
    });
}

document.getElementById('random-recipe').addEventListener("click", function(e){
    e.preventDefault();
    surpriseMe();
})




