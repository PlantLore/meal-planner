import { Food } from "./Food";
import { MealType } from "./MealType";

export class Meal {
    id: number = 0;
    mealType: MealType = MealType.BREAKFAST;
    day: Date = new Date();
    foods: Food[] = [];
}