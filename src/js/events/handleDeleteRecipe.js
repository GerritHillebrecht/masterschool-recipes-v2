import { deleteRecipe } from "../data-access.js";

export async function handleDeleteRecipe(recipeId) {
  try {
    await deleteRecipe(recipeId);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
