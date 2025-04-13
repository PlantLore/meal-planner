import { Recipe } from "./Recipe";
import { MealType } from "./MealType";

export class Meal {
    id: number = 0;
    mealType: MealType = MealType.BREAKFAST;
    recipes: Recipe[] = [];
}