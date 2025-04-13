import { Recipe } from "../models/Recipe";
import { MealPlan } from "../models/MealPlan";
import { MealType } from "../models/MealType";
import { RecipeType } from "../models/RecipeType";

export const mockRecipes: Recipe[] = [
    {
        id: 0,
        title: "Spaghetti",
        steps: [
            {
                id: 1,
                ordinal: 1,
                text: "Cook the pasta"
            },
            {
                id: 2,
                ordinal: 2,
                text: "Cook the meat in read sauce",
            },
            {
                id: 3,
                ordinal: 3,
                text: "Combine and serve!"
            }
        ],
        servings: 4,
        calories: 600,
        recipeTypes: [RecipeType.DINNER, RecipeType.BREAKFAST, RecipeType.FRUIT, RecipeType.VEGETABLE],
        ingredients: [
            {
                id: 1,
                name: 'Ground Italian Sausage',
                quantity: '1',
                unit: 'lb'
            },
            {
                id: 2,
                name: 'Spaghetti Noodles',
                quantity: '1',
                unit: 'package'
            },
            {
                id: 3,
                name: 'Marinara Sause',
                quantity: '1',
                unit: 'jar'
            }
        ],
        image: "https://i.imgur.com/8ewJgNK.png"
    },
];

export const mockMealPlan: MealPlan = {
    id: 1,
    startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    mealPlanDays: [
        {
            id: 1,
            day: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            meals: [
                {
                    id: 1,
                    mealType: MealType.BREAKFAST,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            title: 'Spaghetti 1',
                            id: 1,
                            recipeTypes: [RecipeType.BREAKFAST, RecipeType.FRUIT]
                        },
                        {
                            ...mockRecipes[0],
                            title: 'Spaghetti 2',
                            id: 2,
                            image: '',
                            recipeTypes: [RecipeType.BREAKFAST, RecipeType.SIDE, RecipeType.VEGETABLE]
                        }
                    ]
                },
                {
                    id: 2,
                    mealType: MealType.LUNCH,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            title: 'Spaghetti 3',
                            id: 3,
                            recipeTypes: [RecipeType.LUNCH]
                        }
                    ]
                },
                {
                    id: 3,
                    mealType: MealType.DINNER,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            title: 'Spaghetti 1',
                            id: 4,
                            recipeTypes: [RecipeType.DINNER]
                        },
                        {
                            ...mockRecipes[0],
                            id: 5,
                            image: '',
                            recipeTypes: [RecipeType.DINNER, RecipeType.SIDE]
                        }
                    ]
                },
                {
                    id: 4,
                    mealType: MealType.SNACK,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 6,
                            image: '',
                            recipeTypes: [RecipeType.SNACK]
                        }
                    ]
                },
                {
                    id: 5,
                    mealType: MealType.SWEET_TREAT,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 7,
                            image: '',
                            recipeTypes: [RecipeType.SWEET_TREAT]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            day: new Date(),
            meals: [
                {
                    id: 1,
                    mealType: MealType.BREAKFAST,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 8,
                            recipeTypes: [RecipeType.BREAKFAST]
                        },
                        {
                            ...mockRecipes[0],
                            id: 9,
                            image: '',
                            recipeTypes: [RecipeType.BREAKFAST, RecipeType.SIDE]
                        }
                    ]
                },
                {
                    id: 2,
                    mealType: MealType.LUNCH,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 10,
                            recipeTypes: [RecipeType.LUNCH]
                        }
                    ]
                },
                {
                    id: 3,
                    mealType: MealType.DINNER,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 11,
                            recipeTypes: [RecipeType.DINNER],
                            steps: []
                        },
                        {
                            ...mockRecipes[0],
                            id: 12,
                            image: '',
                            recipeTypes: [RecipeType.DINNER, RecipeType.SIDE]
                        }
                    ]
                },
                {
                    id: 4,
                    mealType: MealType.SNACK,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 13,
                            image: '',
                            recipeTypes: [RecipeType.SNACK],
                            steps: []
                        }
                    ]
                },
                {
                    id: 5,
                    mealType: MealType.SWEET_TREAT,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 14,
                            image: '',
                            recipeTypes: [RecipeType.SWEET_TREAT]
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            day: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            meals: [
                {
                    id: 1,
                    mealType: MealType.BREAKFAST,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 15,
                            recipeTypes: [RecipeType.BREAKFAST]
                        },
                        {
                            ...mockRecipes[0],
                            id: 16,
                            image: '',
                            recipeTypes: [RecipeType.BREAKFAST, RecipeType.SIDE]
                        }
                    ]
                },
                {
                    id: 2,
                    mealType: MealType.LUNCH,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 17,
                            recipeTypes: [RecipeType.LUNCH]
                        }
                    ]
                },
                {
                    id: 3,
                    mealType: MealType.DINNER,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 18,
                            recipeTypes: [RecipeType.DINNER]
                        },
                        {
                            ...mockRecipes[0],
                            id: 19,
                            image: '',
                            recipeTypes: [RecipeType.DINNER, RecipeType.SIDE]
                        }
                    ]
                },
                {
                    id: 4,
                    mealType: MealType.SNACK,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 20,
                            image: '',
                            recipeTypes: [RecipeType.SNACK]
                        }
                    ]
                },
                {
                    id: 5,
                    mealType: MealType.SWEET_TREAT,
                    recipes: [
                        {
                            ...mockRecipes[0],
                            id: 21,
                            image: '',
                            recipeTypes: [RecipeType.SWEET_TREAT]
                        }
                    ]
                }
            ]
        }
    ]
};