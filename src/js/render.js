import { RecipeCard, RecipeForm } from "./components/index.js";
import { addRecipe } from "./data-access.js";
import { createDateFromInputs } from "./utils/dates.js";

export function renderRecipes(recipes, target) {
  // Unregister all EventListeners
  target.innerHTML = "";

  if (recipes.length === 0) {
    target.innerHTML = `<div class="w-full lg:col-span-2 flex justify-center items-center flex-col">
    <img src="./img/not-found.svg" alt="No recipes found" class="w-[40%] mb-2" />
    <p class="text-4xl">No recipes found</p>
    </div>`;
    return;
  }

  recipes.forEach((recipe) => {
    target.appendChild(RecipeCard(recipe));
  });
}

export function renderAsideForm(target) {
  target.appendChild(RecipeForm());

  const recipeForm = document.forms.recipeForm;

  recipeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const recipeName = recipeForm.recipeName.value;
    const recipeIngredients = recipeForm.recipeIngredients.value;
    const recipeInstructions = recipeForm.recipeInstructions.value;
    const recipeImage = recipeForm.recipeImage.value;
    const recipeDate = createDateFromInputs(
      recipeForm.recipeDate.value,
      recipeForm.recipeTime.value
    );

    const newRecipe = {
      name: recipeName,
      ingredients: recipeIngredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions: recipeInstructions.split(".").map((step) => step.trim()),
      image: recipeImage,
      date: recipeDate.toISOString(),
    };

    addRecipe(newRecipe);
  });
}
