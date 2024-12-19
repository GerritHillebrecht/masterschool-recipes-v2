import { LoadingIcon, Navbar } from "./components/index.js";
import { routes } from "./config.js";
import { fetchRecipes, fetchRecipesBySearch } from "./data-access.js";
import { renderAsideForm, renderRecipes } from "./render.js";
import { debounce } from "./utils/debounce.js";
import { sleep } from "./utils/sleep.js";

const body = document.querySelector("body");
const aside = document.querySelector("aside");
body.prepend(Navbar(routes));
renderAsideForm(aside);

const recipeGrid = document.getElementById("recipeGrid");
const autoComplete = document.getElementById("autocomplete-search");

async function start() {
  try {
    const recipes = await fetchRecipes();
    const parsedRecipes = recipes.map((recipe) => ({
      ...recipe,
      date: new Date(recipe.date),
    }));
    renderRecipes(parsedRecipes, recipeGrid);
  } catch (error) {
    console.error(error);
  }
}

async function handleKeydown(event) {
  const searchResults = await fetchRecipesBySearch(autoComplete.value);
  recipeGrid.innerHTML = "";
  const centeredDiv = document.createElement("div");
  centeredDiv.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "w-full",
    "lg:col-span-2",
    "h-full"
  );

  centeredDiv.innerHTML = LoadingIcon();
  recipeGrid.appendChild(centeredDiv);

  // await sleep(1500);
  renderRecipes(searchResults, recipeGrid);
}

const debounceTime = 300;
const debouncedHandleKeydown = debounce(handleKeydown, debounceTime);

document
  .querySelector("#autocomplete-search")
  .addEventListener("keydown", debouncedHandleKeydown);

start();
