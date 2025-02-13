import { MealPlan } from "../models/MealPlan";
import { mockMealPlan } from "./mockData";

export const getMealPlan = (): MealPlan => {
    return mockMealPlan;
};