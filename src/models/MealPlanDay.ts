import { Meal } from "./Meal";

export class MealPlanDay {
    id: number = 0;
    day: Date = new Date();
    meals: Meal[] = [];
}