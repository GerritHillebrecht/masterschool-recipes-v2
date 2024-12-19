import { renderRecipes } from "../render.js";
import { createDateFromInputs } from "../utils/dates.js";
import { updateRecipe } from "../data-access.js";

const modalBackdrop = document.getElementById("recipe-update-modal-backdrop");
const updateRecipeForm = document.forms.updateRecipeForm;
const updateBtn = document.querySelector(".update");
const cancelBtn = document.querySelector(".cancel");

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    updateRecipeForm.reset();
    hideModal();
  }
});

cancelBtn.addEventListener("click", () => {
  updateRecipeForm.reset();
  hideModal();
});

updateBtn.addEventListener("click", async () => {
  const { recipeName, recipeIngredients, recipeInstructions, recipeImage } =
    updateRecipeForm;

  const updateRecipeIndex = updateBtn.dataset.recipeIndex;

  const recipe = {
    name: recipeName.value,
    ingredients: recipeIngredients.value
      .split(",")
      .map((ingredient) => ingredient.trim()),
    instructions: recipeInstructions.value
      .split(".")
      .map((step) => step.trim()),
    image: recipeImage.value,
    date: createDateFromInputs(
      updateRecipeForm.recipeDate.value,
      updateRecipeForm.recipeTime.value
    ).toISOString(),
  };

  await updateRecipe(recipe, updateRecipeIndex);

  renderRecipes();
  updateRecipeForm.reset();

  hideModal();
});

function hideModal() {
  modalBackdrop.classList.add("hidden");
}

export function showModal(recipe, recipeIndex) {
  setRecipeValues(recipe, recipeIndex);
  modalBackdrop.classList.remove("hidden");
}

function setRecipeValues(
  { name, ingredients, instructions, image, date },
  recipeIndex
) {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  const dateValue = `${year}-${month}-${day}`;
  const timeValue = `${hours}:${minutes}`;

  updateRecipeForm.recipeName.value = name;
  updateRecipeForm.recipeIngredients.value = ingredients.join(", ");
  updateRecipeForm.recipeInstructions.value = instructions. join(". ");
  updateRecipeForm.recipeImage.value = image;
  updateRecipeForm.recipeDate.value = dateValue;
  updateRecipeForm.recipeTime.value = timeValue;

  updateBtn.dataset.recipeIndex = recipeIndex;
}
