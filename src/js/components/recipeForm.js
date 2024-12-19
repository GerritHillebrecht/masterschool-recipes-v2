export function RecipeForm() {
  const formContainer = document.createElement("div");
  formContainer.classList.add(
    "border",
    "rounded-lg",
    "hover:scale-[1.02]",
    "transition-all",
    "duration-300",
    "shadow-lg",
    "p-6",
    "bg-white"
  );

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getNextFullHour() {
    const now = new Date();
    const nextHour = new Date(now.setHours(now.getHours() + 1, 0, 0, 0));
    const hours = String(nextHour.getHours()).padStart(2, "0");
    const minutes = String(nextHour.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  formContainer.innerHTML = `
      <h2 class="text-center text-2xl headline">Add Recipe</h2>
      <form name="recipeForm">
        <!-- Recipe Name -->
        <div class="mt-4">
          <label for="recipeName" class="block text-sm/6 font-medium text-gray-900">Recipe Name</label>
          <div class="mt-2">
            <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <input type="text" name="recipeName" id="recipeName" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Recipe Name" required />
            </div>
          </div>
        </div>
  
        <!-- Ingredients -->
        <div class="mt-4">
          <label for="recipeIngredients" class="block text-sm/6 font-medium text-gray-900">Ingredients</label>
          <div class="mt-2">
            <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <textarea type="text" name="recipeIngredients" id="recipeIngredients" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Ingredients" required /></textarea>
            </div>
            <p class="hint text-xs opacity-45 mt-1">Separate each ingredient with a comma</p>
          </div>
        </div>
  
        <!-- Procedure -->
        <div class="mt-4">
          <label for="recipeInstructions" class="block text-sm/6 font-medium text-gray-900">Steps for preparation</label>
          <div class="mt-2">
            <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <textarea name="recipeInstructions" id="recipeInstructions" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Steps for preparation" required></textarea>
            </div>
            <p class="hint text-xs opacity-45 mt-1">Each sentence gets its own instruction line.</p>
          </div>
        </div>

        <!-- Calendar -->
        <div class="mt-4">
          <label for="recipeInstructions" class="block text-sm/6 font-medium text-gray-900">
            When do you want to make this recipe?
          </label>
          <div class="mt-2 grid grid-cols-2 gap-2">
            <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <input type="date" name="recipeDate" id="recipeDate" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Steps for preparation" required></textarea>
            </div>
            <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <input type="time" name="recipeTime" id="recipeTime" min="" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Steps for preparation" required></textarea>
            </div>
            <p class="hint col-span-2 text-xs opacity-45 mt-1">
              Please choose a date to prepare this meal.
            </p>
          </div>
        </div>
  
        <!-- Image URL -->
        <div class="mt-4">
          <label for="recipeImage" class="block text-sm/6 font-medium text-gray-900">Image URL</label>
          <div class="mt-2">
            <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <input type="url" name="recipeImage" id="recipeImage" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Image URL" required />
            </div>
            <p class="hint text-xs opacity-45 mt-1">Provide a URL to an image of the recipe. Self-hosting is currently not supported.</p>
          </div>
        </div>
  
        <button type="submit" class="h-9 mt-4 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">Add Recipe</button>
      </form>
    `;

  const recipeDateRef = formContainer.querySelector("#recipeDate");
  const recipeTimeRef = formContainer.querySelector("#recipeTime");

  recipeDateRef.value = getToday();
  recipeDateRef.min = getToday();

  recipeTimeRef.value = getNextFullHour();

  return formContainer;
}
