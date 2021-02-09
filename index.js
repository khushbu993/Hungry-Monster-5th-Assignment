const serchBtn = document.getElementById("searchBtn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipeCloseBtn");

// event listeners section
serchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// meal list matching with the ingredients

function getMealList(e) {
  e.preventDefault();
  let searchInputTxt = document.getElementById("searchInput").value.trim();
  console.log(searchInputTxt);
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                        <div class="col-xl-4">
                            <div class="meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img class="mealItem" src="${meal.strMealThumb}" alt="" />
                                </div>
                                <div class="meal-name">
                                    <h3 class="mealItem">${meal.strMeal}</h3>
                                </div>
                            </div>
                        </div>`;
        });
      } else {
        html = "Sorry! We did not find your meal.";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

// recipe meal
function getMealRecipe(e) {
  if (e.target.classList.contains("mealItem")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// recipe details with modals
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
        <div class="meal-detail-img">
          <img src="${meal.strMealThumb}" alt="" />
        </div>
        <div class="meal-title">
          <h3>${meal.strMeal}</h3>
        </div>
        <div class="meal-ingredients">
          <h5>ingredients</h5>
              <ul>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient1}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient2}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient3}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient4}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient5}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient6}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient7}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient8}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient9}</li>
                <li><i class="fas fa-check-square"></i>${meal.strIngredient10}</li>
              </ul>
          </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
