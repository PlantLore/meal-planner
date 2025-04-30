import { MealType } from "./MealType";
import { MealRecipe } from "./MealRecipe";

export class Meal {
    id: number = 0;
    mealType: MealType = MealType.BREAKFAST;
    mealRecipes: MealRecipe[] = [];
}