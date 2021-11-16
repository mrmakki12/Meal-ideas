const api = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const searchButton = document.getElementById('search-meals');
const container = document.getElementById('container');

/**
 * Gets meals from api that use ingredient
 * @param {*} event 
 */
async function getMeals(event) {
    event.preventDefault();
    const results = document.getElementById('results');
    try {

        const response = await fetch(api+document.getElementById('search-ingredient').value);

        //Clear current results if any
        let removeables = document.getElementsByClassName('meal');
        while(removeables[0]) {
            removeables[0].parentNode.removeChild(removeables[0]);
        }
        
        if(response.ok) {

            console.log(response);
            const jsonResponse = await response.json();
            console.log(jsonResponse);

            if(jsonResponse.meals == null) {
                //1) Tell user that there aren't any recipies for that ingredient
                results.innerHTML = "Sorry, We don't have an Recipies for that Ingredient :(";

            } else {
                //1) Tell user we found results
                results.innerHTML = "Here are Your Results!";

                //2) Create meal div and put image and description in each
                let current_meal;
                let background;

                for(let i = 0; i < jsonResponse.meals.length; i++) {
                    current_meal = jsonResponse.meals[i];
                    let meal = document.createElement('div');
                    let image = document.createElement('div');
                    background = "url(" + current_meal.strMealThumb + ")";
                    image.style.backgroundImage = background;
                    let description = document.createElement('div');
                    description.innerHTML = current_meal.strMeal;
                    description.classList.add('description');
                    image.classList.add('image');
                    meal.classList.add('meal');
                    meal.appendChild(image);
                    meal.appendChild(description);
                    container.appendChild(meal);
                }
            }
        }
    } catch(error) {
        //1) Tell the user that there was an error
        console.log(error);
        results.innerHTML = "Sorry, There was an error. Please try again :(";

    }
    // clear form
    document.getElementById('search-ingredient').value = '';

}

searchButton.addEventListener('click', getMeals);

