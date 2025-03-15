import { Food } from "../models/Food";
import { Meal } from "../models/Meal";
import { MealPlanDay } from "../models/MealPlanDay";
import { mockFoods, mockMealPlan } from "./mockData";

export const getAllFoods = (): Food[] => {
    return mockMealPlan.mealPlanDays
        .map((mealPlanDay: MealPlanDay) => mealPlanDay.meals)
        .flat()
        .map((meal: Meal) => meal.foods)
        .flat();
};

export const getFoodById = (id: number): Food => {
    const food = mockMealPlan.mealPlanDays
        .map((mealPlanDay: MealPlanDay) => mealPlanDay.meals)
        .flat()
        .map((meal: Meal) => meal.foods)
        .flat()
        .find((food: Food) => food.id === id);

    return food || mockFoods[0];
};

export const upsertFood = (food: Food): Food => {
    return food;
};