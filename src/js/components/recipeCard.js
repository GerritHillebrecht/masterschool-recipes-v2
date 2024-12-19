import { handleDeleteRecipe } from "../events/handleDeleteRecipe.js";
import { showModal } from "../events/modal.js";

export function RecipeCard(recipe) {
  const { id, name, ingredients, image, instructions, date } = recipe;
  const wrapper = document.createElement("div");

  const card = document.createElement("div");
  card.classList.add(
    "group",
    "relative",
    "lg:hover:scale-[1.02]",
    "hover:shadow-xl",
    "transition-all",
    "duration-300",
    "rounded-lg",
    "border",
    "p-4",
    "bg-card",
    "text-card-foreground",
    "shadow-lg",
    "overflow-hidden"
  );

  const recipeLink = document.createElement("a");
  recipeLink.href = `/src/recipe.html?r=${id}`;

  const title = document.createElement("h2");
  title.classList.add("text-center", "text-2xl", "mb-4", "headline");
  title.textContent = name;

  const dateBadge = document.createElement("span");
  dateBadge.classList.add(
    "block",
    "px-2",
    "py-1",
    "text-xs",
    "font-semibold",
    "rounded-full",
    "text-primary",
    "bg-primary/10",
    "mb-4",
    "mt-1"
  );

  const dateObj = new Date(date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  dateBadge.textContent = dateObj.toLocaleDateString("de-DE", options);

  title.appendChild(dateBadge);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("-mx-4");

  const img = document.createElement("img");
  img.classList.add(
    "group-hover:saturate-150",
    "saturate-[0.75]",
    "transition-all",
    "duration-300",
    "inline-block",
    "w-full",
    "aspect-video",
    "object-cover",
    "object-center"
  );
  img.src = image;
  img.alt = name;

  imageContainer.appendChild(img);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "items-center", "gap-2", "pt-4");

  const deleteButton = document.createElement("button");
  deleteButton.title = `Delete ${name}`;
  deleteButton.classList.add("delete-recipe", "border", "rounded-lg", "p-2");
  deleteButton.dataset.recipeId = id;
  deleteButton.innerHTML = `
<svg class="w-4 h-4 !text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>`;

  const editButton = document.createElement("button");
  editButton.title = `Edit ${name}`;
  editButton.classList.add("edit-recipe", "border", "rounded-lg", "p-2");
  editButton.dataset.recipeName = id;
  editButton.innerHTML = `
<svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg> `;

  deleteButton.addEventListener("click", () => {
    const prompt = `Are you sure you want to delete the recipe for ${name}?`;
    if (confirm(prompt)) {
      handleDeleteRecipe(id);
    }
  });

  editButton.addEventListener("click", () => showModal(recipe, id));

  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(editButton);

  const ingredientsTitle = document.createElement("p");
  ingredientsTitle.classList.add("mt-4", "headline", "font-bold");
  ingredientsTitle.textContent = "Ingredients:";

  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add("list-disc", "list-inside", "mb-4");
  [...ingredients].splice(0, 3).forEach((ingredient) => {
    const li = document.createElement("li");
    li.classList.add("text-sm");
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  if (ingredients.length > 3) {
    const moreIngredientsElipsis = document.createElement("li");
    moreIngredientsElipsis.classList.add("text-gray-500", "text-sm");
    moreIngredientsElipsis.textContent = "...";

    ingredientsList.appendChild(moreIngredientsElipsis);
  }

  const instructionsTitle = document.createElement("p");
  instructionsTitle.classList.add("headline", "font-bold");
  instructionsTitle.textContent = "Instructions:";

  const instructionsList = document.createElement("ol");
  instructionsList.classList.add("list-decimal", "list-inside");
  [...instructions].splice(0, 3).forEach((instruction) => {
    const li = document.createElement("li");
    li.classList.add("text-sm");
    li.textContent = instruction;
    instructionsList.appendChild(li);
  });

  if (instructions.length > 3) {
    const moreInstructionsElipsis = document.createElement("li");
    moreInstructionsElipsis.classList.add("text-gray-500", "text-sm");
    moreInstructionsElipsis.textContent = "...";
    instructionsList.appendChild(moreInstructionsElipsis);
  }

  const GoToRecipeButton = document.createElement("button");
  GoToRecipeButton.classList.add(
    "h9",
    "mt-4",
    "w-full",
    "px-4",
    "py-2",
    "inline-flex",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "rounded-md",
    "text-sm",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-1",
    "focus-visible:ring-ring",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "bg-primary",
    "text-primary-foreground",
    "shadow",
    "hover:bg-primary/90"
  );
  GoToRecipeButton.textContent = "Go to Recipe";
  GoToRecipeButton.addEventListener("click", () => {
    window.location.href = `/src/recipe.html?r=${id}`;
  });

  recipeLink.appendChild(title);
  recipeLink.appendChild(imageContainer);
  card.appendChild(recipeLink);
  card.appendChild(buttonContainer);
  card.appendChild(ingredientsTitle);
  card.appendChild(ingredientsList);
  card.appendChild(instructionsTitle);
  card.appendChild(instructionsList);
  card.appendChild(GoToRecipeButton);

  wrapper.appendChild(card);

  return wrapper;
}
