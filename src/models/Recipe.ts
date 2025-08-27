import { RecipeType } from "./RecipeType";
import { Ingredient } from "./Ingredient";
import { Step } from "./Step";

export class Recipe {
  id: number = 0;
  title: string = "";
  steps: Step[] = [];
  servings: number = 0;
  calories: number = 0;
  recipeTypes: RecipeType[] = [];
  ingredients: Ingredient[] = [];
  image: string = "";
  archived: boolean = false;
}
