import { Recipe } from "../models/Recipe";
import { Meal } from "../models/Meal";
import { MealPlanDay } from "../models/MealPlanDay";
import { mockRecipes, mockMealPlan, mockRecipeLabels } from "./mockData";
import { MealRecipe } from "../models/MealRecipe";
import { RecipeLabel } from "../models/RecipeLabel";

export const getAllRecipes = (): Recipe[] => {
    return mockMealPlan.mealPlanDays
        .map((mealPlanDay: MealPlanDay) => mealPlanDay.meals)
        .flat()
        .map((meal: Meal) => meal.mealRecipes.map((mealRecipe: MealRecipe) => mealRecipe.recipe))
        .flat()
        .filter((recipe: Recipe) => !recipe.archived);
};

export const getAllRecipeLabels = (): RecipeLabel[] => {
    return mockRecipeLabels;
}

export const getAllRecipesIncludeArchived = (): Recipe[] => {
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

export const getUpdatedRecipeByRecipeId = (id: number): Recipe => {
    const recipe = mockMealPlan.mealPlanDays
        .map((mealPlanDay: MealPlanDay) => mealPlanDay.meals)
        .flat()
        .map((meal: Meal) => meal.mealRecipes.map((mealRecipe: MealRecipe) => mealRecipe.recipe))
        .flat()
        .find((recipe: Recipe) => recipe.id === id + 3);

    return recipe || mockRecipes[0];
}

export const upsertRecipe = (recipe: Recipe): Recipe => {
    return recipe;
};

export const archiveRecipe = (id: number): void => {
    return;
};