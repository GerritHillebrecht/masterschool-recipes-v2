import { routes } from "./config.js";
import { LoadingIcon, Navbar } from "./components/index.js";
import { fetchRecipeById } from "./data-access.js";
import { sleep } from "./utils/sleep.js";

const body = document.querySelector("body");
const recipeContainer = document.querySelector(".recipeContainer");

body.prepend(Navbar(routes));

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("r");

async function renderSite() {
  const loaderWrapper = document.createElement("div");
  loaderWrapper.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "w-full",
    "h-[calc(100vh-4rem)]"
  );
  loaderWrapper.innerHTML = LoadingIcon();
  recipeContainer.appendChild(loaderWrapper);
  const recipe = await fetchRecipeById(recipeId);
//   await sleep(1200);
  recipeContainer.innerHTML = "";

  const recipeTitle = document.createElement("h1");
  recipeTitle.textContent = recipe.name;
  recipeTitle.classList.add("text-6xl", "handwritten", "text-center", "mb-4");

  const recipeImage = document.createElement("img");
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.name;
  recipeImage.classList.add(
    "rounded-lg",
    "w-full",
    "shadow-lg",
    "block",
    "aspect-[16/6]",
    "mb-4",
    "object-cover",
    "object-center"
  );

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add(
    "grid",
    "grid-cols-1",
    "lg:grid-cols-[2fr,1fr]",
    "gap-4"
  );

  const ingredientsWrapper = document.createElement("div");

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add(
    "border",
    "rounded-lg",
    "p-4",
    "bg-white",
    "shadow-lg",
    "mb-4"
  );

  const ingredientsTitle = document.createElement("h2");
  ingredientsTitle.textContent = "Ingredients";
  ingredientsTitle.classList.add("text-2xl", "headline", "mb-2");

  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add("list-disc", "list-inside");
  ingredientsList.innerHTML = recipe.ingredients
    .map((ingredient) => `<li>${ingredient.trim()}</li>`)
    .join("");

  ingredientsContainer.appendChild(ingredientsTitle);
  ingredientsContainer.appendChild(ingredientsList);

  ingredientsWrapper.appendChild(ingredientsContainer);

  const instructionsContainer = document.createElement("div");
  instructionsContainer.classList.add(
    "border",
    "rounded-lg",
    "p-4",
    "bg-white",
    "shadow-lg",
    "mb-4"
  );

  const instructionsTitle = document.createElement("h2");
  instructionsTitle.textContent = "Instructions";
  instructionsTitle.classList.add("text-2xl", "headline", "mb-2");

  const instructionsList = document.createElement("ol");

  instructionsList.classList.add(
    "list-decimal",
    "list-inside",
    "marker:text-stone-400",
    "marker:font-thin",
    "marker:block"
  );
  instructionsList.innerHTML = recipe.instructions
    .filter((step) => step.trim() !== "")
    .map((step) => `<li class="py-2">${step.trim()}</li>`)
    .join("");

  instructionsContainer.appendChild(instructionsTitle);
  instructionsContainer.appendChild(instructionsList);

  contentWrapper.appendChild(instructionsContainer);
  contentWrapper.appendChild(ingredientsWrapper);

  recipeContainer.appendChild(recipeTitle);
  recipeContainer.appendChild(recipeImage);
  recipeContainer.appendChild(contentWrapper);
}

renderSite();
