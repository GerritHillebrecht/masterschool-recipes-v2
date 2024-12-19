import { Recipe, PartialRecipe } from "./models/recipe.model.js";
import { API_ENDPOINT } from "./config.js";

export async function fetchRecipes() {
  try {
    const response = await fetch(`${API_ENDPOINT}/recipes`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

export async function fetchRecipeById(recipeId) {
  try {
    const response = await fetch(`${API_ENDPOINT}/recipes/${recipeId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipe");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
}

export async function addRecipe(recipe) {
  try {
    const result = Recipe.safeParse(recipe);

    if (!result.success) {
      throw new Error("Your recipe is invalid");
    }

    const response = await fetch(`${API_ENDPOINT}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error("Failed to add recipe");
    }

    const recipeResult = await response.json();

    return recipeResult;
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
}

export async function deleteRecipe(recipeId) {
  try {
    const response = await fetch(`${API_ENDPOINT}/recipes/${recipeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete recipe");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
}

export async function updateRecipe(recipe, recipeId) {
  try {
    const result = PartialRecipe.safeParse(recipe);

    if (!result.success) {
      console.log(recipe);
      throw new Error("Your recipe is invalid");
    }

    const response = await fetch(`${API_ENDPOINT}/recipes/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error("Failed to update recipe");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
}

export async function fetchRecipesBySearch(searchTerm) {
  try {
    const response = await fetch(`${API_ENDPOINT}/search?q=${searchTerm}`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}
