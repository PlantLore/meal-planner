import { MealPlanDay } from "./MealPlanDay";

export class MealPlan {
    id: number = 0;
    startDate: Date = new Date();
    endDate: Date = new Date();
    mealPlanDays: MealPlanDay[] = [];
}