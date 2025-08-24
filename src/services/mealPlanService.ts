import { MealPlan } from "../models/MealPlan";
import { mockMealPlan } from "./mockData";

export const getMealPlanById = (id: number): MealPlan => {
  return { ...mockMealPlan, id: id };
};

export const upsertMealPlan = (mealPlan: MealPlan) => {
  return mealPlan;
};

export const getMealPlans = (): MealPlan[] => {
  const mealPlanArr: MealPlan[] = [];

  for (let i = 1; i <= 50; i++) {
    mealPlanArr.push({ ...mockMealPlan, id: i });
  }

  return mealPlanArr;
};

export const deleteMealPlan = (id: number): void => {
  return;
};
