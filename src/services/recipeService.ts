import { Recipe } from "../models/Recipe";
import { Meal } from "../models/Meal";
import { MealPlanDay } from "../models/MealPlanDay";
import { mockRecipes, mockMealPlan } from "./mockData";
import { MealRecipe } from "../models/MealRecipe";

export const getAllRecipes = (): Recipe[] => {
    return mockMealPlan.mealPlanDays
        .map((mealPlanDay: MealPlanDay) => mealPlanDay.meals)
        .flat()
        .map((meal: Meal) => meal.mealRecipes.map((mealRecipe: MealRecipe) => mealRecipe.recipe))
        .flat();
};

export const getRecipeById = (id: number): Recipe => {
    const recipe = mockMealPlan.mealPlanDays
        .map((mealPlanDay: MealPlanDay) => mealPlanDay.meals)
        .flat()
        .map((meal: Meal) => meal.mealRecipes.map((mealRecipe: MealRecipe) => mealRecipe.recipe))
        .flat()
        .find((recipe: Recipe) => recipe.id === id);

    return recipe || mockRecipes[0];
};

export const upsertRecipe = (recipe: Recipe): Recipe => {
    return recipe;
};

export const deleteRecipe = (id: number): void => {
    return;
};