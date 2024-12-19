import { RecipeCard, RecipeForm } from "./components/index.js";
import { addRecipe } from "./data-access.js";
import { createDateFromInputs } from "./utils/dates.js";

export function renderRecipes(recipes, target) {
  // Unregister all EventListeners
  target.innerHTML = "";

  if (recipes.length === 0) {
    const container = document.createElement("div");
    container.classList.add(
      "w-full",
      "lg:col-span-2",
      "flex",
      "justify-center",
      "items-center",
      "flex-col"
    );

    const img = document.createElement("img");
    img.src = "./img/not-found.svg";
    img.alt = "No recipes found";
    img.classList.add("w-[40%]", "mb-2");

    const paragraph = document.createElement("p");
    paragraph.textContent = "No recipes found";
    paragraph.classList.add("text-4xl");

    container.appendChild(img);
    container.appendChild(paragraph);

    target.innerHTML = "";
    target.appendChild(container);

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
