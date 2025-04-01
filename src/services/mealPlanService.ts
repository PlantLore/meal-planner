import { MealPlan } from "../models/MealPlan";
import { mockMealPlan } from "./mockData";

export const getMealPlanById = (id: number): MealPlan => {
  return mockMealPlan;
};

export const upsertMealPlan = (mealPlan: MealPlan) => {
  return mealPlan;
};
