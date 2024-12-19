import { z } from "/node_modules/zod/lib/index.mjs";

export const Recipe = z.object({
  id: z.number().optional(),
  name: z.string().min(3),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  image: z.string().url(),
  date: z.string(),
});

export const PartialRecipe = Recipe.partial();
