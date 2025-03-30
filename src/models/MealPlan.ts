import { MealPlanDay } from "./MealPlanDay";

export class MealPlan {
    id: number = 0;
    startDate!: Date;
    endDate!: Date;
    mealPlanDays: MealPlanDay[] = [];
}