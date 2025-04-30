import { Recipe } from "./Recipe";

export class MealRecipe {
    id: number = 0;
    recipe: Recipe = new Recipe();
    leftovers: boolean = false;
}