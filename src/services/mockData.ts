import { Recipe } from "../models/Recipe";
import { MealPlan } from "../models/MealPlan";
import { MealType } from "../models/MealType";
import { RecipeType } from "../models/RecipeType";
import { GrocerySection } from "../models/GrocerySection";
import { Grocery } from "../models/Grocery";
import { GroceryList } from "../models/GroceryList";

export const mockGroceries: Grocery[] = [
    {
        id: 1,
        name: 'Ground Italian Sausage',
        section: GrocerySection.MEAT
    },
    {
        id: 2,
        name: 'Spaghetti Noodles',
        section: GrocerySection.INNER_AISLES
    },
    {
        id: 3,
        name: 'Marinara Sauce',
        section: GrocerySection.INNER_AISLES
    }
];

export const mockGroceryList: GroceryList = {
    id: 1,
    grocerySections: [
        {
            id: 1,
            grocerySection: GrocerySection.MEAT,
            groceries: [
                ...mockGroceries.map((mockGrocery: Grocery) => {
                    return {
                        id: mockGrocery.id,
                        grocery: mockGrocery,
                        quantity: '1',
                        unit: 'lb',
                        checked: false
                    };
                })
            ]
        },
        {
            id: 2,
            grocerySection: GrocerySection.INNER_AISLES,
            groceries: [
                ...mockGroceries.map((mockGrocery: Grocery) => {
                    return {
                        id: mockGrocery.id,
                        grocery: mockGrocery,
                        quantity: '1',
                        unit: 'lb',
                        checked: false
                    };
                })
            ]
        },
        {
            id: 3,
            grocerySection: GrocerySection.PRODUCE,
            groceries: [
                ...mockGroceries.map((mockGrocery: Grocery) => {
                    return {
                        id: mockGrocery.id,
                        grocery: mockGrocery,
                        quantity: '1',
                        unit: 'lb',
                        checked: false
                    };
                })
            ]
        }
    ]
};

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
                grocery: mockGroceries[0],
                quantity: '1',
                unit: 'lb'
            },
            {
                id: 2,
                grocery: mockGroceries[1],
                quantity: '1',
                unit: 'package'
            },
            {
                id: 3,
                grocery: mockGroceries[2],
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
                    mealRecipes: [
                        {
                            id: 1,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                title: 'Spaghetti 1',
                                id: 1,
                                recipeTypes: [RecipeType.BREAKFAST, RecipeType.FRUIT]
                            }
                        },
                        {
                            id: 2,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                title: 'Spaghetti 2',
                                id: 2,
                                image: '',
                                recipeTypes: [RecipeType.BREAKFAST, RecipeType.SIDE, RecipeType.VEGETABLE]
                            }
                        }
                    ]
                },
                {
                    id: 2,
                    mealType: MealType.LUNCH,
                    mealRecipes: [
                        {
                            id: 3,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                title: 'Spaghetti 3',
                                id: 3,
                                recipeTypes: [RecipeType.LUNCH]
                            }
                        }
                    ]
                },
                {
                    id: 3,
                    mealType: MealType.DINNER,
                    mealRecipes: [
                        {
                            id: 4,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                title: 'Spaghetti 1',
                                id: 4,
                                recipeTypes: [RecipeType.DINNER]
                            }
                        },
                        {
                            id: 5,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 5,
                                image: '',
                                recipeTypes: [RecipeType.DINNER, RecipeType.SIDE]
                            }
                        }
                    ]
                },
                {
                    id: 4,
                    mealType: MealType.SNACK,
                    mealRecipes: [
                        {
                            id: 6,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 6,
                                image: '',
                                recipeTypes: [RecipeType.SNACK]
                            }
                        }
                    ]
                },
                {
                    id: 5,
                    mealType: MealType.SWEET_TREAT,
                    mealRecipes: [
                        {
                            id: 7,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 7,
                                image: '',
                                recipeTypes: [RecipeType.SWEET_TREAT]
                            }
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
                    mealRecipes: [
                        {
                            id: 8,
                            leftovers: true,
                            recipe: {
                                ...mockRecipes[0],
                                id: 8,
                                recipeTypes: [RecipeType.BREAKFAST]
                            },
                        },
                        {
                            id: 9,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 9,
                                image: '',
                                recipeTypes: [RecipeType.BREAKFAST, RecipeType.SIDE]
                            }
                        }
                    ]
                },
                {
                    id: 2,
                    mealType: MealType.LUNCH,
                    mealRecipes: [
                        {
                            id: 10,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 10,
                                recipeTypes: [RecipeType.LUNCH]
                            }
                        }
                    ]
                },
                {
                    id: 3,
                    mealType: MealType.DINNER,
                    mealRecipes: [
                        {
                            id: 11,
                            leftovers: true,
                            recipe: {
                                ...mockRecipes[0],
                                id: 11,
                                recipeTypes: [RecipeType.DINNER],
                                steps: []
                            },
                        },
                        {
                            id: 12,
                            leftovers: true,
                            recipe: {
                                ...mockRecipes[0],
                                id: 12,
                                image: '',
                                recipeTypes: [RecipeType.DINNER, RecipeType.SIDE]
                            }
                        }
                    ]
                },
                {
                    id: 4,
                    mealType: MealType.SNACK,
                    mealRecipes: [
                        {
                            id: 13,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 13,
                                image: '',
                                recipeTypes: [RecipeType.SNACK]
                            }
                        }
                    ]
                },
                {
                    id: 5,
                    mealType: MealType.SWEET_TREAT,
                    mealRecipes: [
                        {
                            id: 13,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 13,
                                image: '',
                                recipeTypes: [RecipeType.SWEET_TREAT]
                            }
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
                    mealRecipes: [
                        {
                            id: 14,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                title: 'Spaghetti 1',
                                id: 14,
                                recipeTypes: [RecipeType.BREAKFAST, RecipeType.FRUIT]
                            }
                        },
                        {
                            id: 15,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                title: 'Spaghetti 2',
                                id: 15,
                                image: '',
                                recipeTypes: [RecipeType.BREAKFAST, RecipeType.SIDE, RecipeType.VEGETABLE]
                            }
                        }
                    ]
                },
                {
                    id: 2,
                    mealType: MealType.LUNCH,
                    mealRecipes: [
                        {
                            id: 16,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                title: 'Spaghetti 3',
                                id: 16,
                                recipeTypes: [RecipeType.LUNCH]
                            }
                        }
                    ]
                },
                {
                    id: 3,
                    mealType: MealType.DINNER,
                    mealRecipes: [
                        {
                            id: 17,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                title: 'Spaghetti 1',
                                id: 17,
                                recipeTypes: [RecipeType.DINNER]
                            }
                        },
                        {
                            id: 18,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 18,
                                image: '',
                                recipeTypes: [RecipeType.DINNER, RecipeType.SIDE]
                            }
                        }
                    ]
                },
                {
                    id: 4,
                    mealType: MealType.SNACK,
                    mealRecipes: [
                        {
                            id: 19,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 19,
                                image: '',
                                recipeTypes: [RecipeType.SNACK]
                            }
                        }
                    ]
                },
                {
                    id: 5,
                    mealType: MealType.SWEET_TREAT,
                    mealRecipes: [
                        {
                            id: 20,
                            leftovers: false,
                            recipe: {
                                ...mockRecipes[0],
                                id: 20,
                                image: '',
                                recipeTypes: [RecipeType.SWEET_TREAT]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};