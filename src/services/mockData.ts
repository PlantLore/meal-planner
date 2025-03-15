import { Food } from "../models/Food";
import { FoodType } from "../models/FoodType";
import { MealPlan } from "../models/MealPlan";
import { MealType } from "../models/MealType";

export const mockFoods: Food[] = [
    {
        id: 0,
        title: "Spaghetti",
        recipe: [
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
        foodTypes: [FoodType.DINNER, FoodType.BREAKFAST, FoodType.FRUIT, FoodType.VEGETABLE],
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
                    day: new Date(),
                    mealType: MealType.BREAKFAST,
                    foods: [
                        {
                            ...mockFoods[0],
                            title: 'Spaghetti 1',
                            id: 1,
                            foodTypes: [FoodType.BREAKFAST, FoodType.FRUIT]
                        },
                        {
                            ...mockFoods[0],
                            title: 'Spaghetti 2',
                            id: 2,
                            image: '',
                            foodTypes: [FoodType.BREAKFAST, FoodType.SIDE, FoodType.VEGETABLE]
                        }
                    ]
                },
                {
                    id: 2,
                    day: new Date(),
                    mealType: MealType.LUNCH,
                    foods: [
                        {
                            ...mockFoods[0],
                            title: 'Spaghetti 3',
                            id: 3,
                            foodTypes: [FoodType.LUNCH]
                        }
                    ]
                },
                {
                    id: 3,
                    day: new Date(),
                    mealType: MealType.DINNER,
                    foods: [
                        {
                            ...mockFoods[0],
                            title: 'Spaghetti 1',
                            id: 4,
                            foodTypes: [FoodType.DINNER]
                        },
                        {
                            ...mockFoods[0],
                            id: 5,
                            image: '',
                            foodTypes: [FoodType.DINNER, FoodType.SIDE]
                        }
                    ]
                },
                {
                    id: 4,
                    day: new Date(),
                    mealType: MealType.SNACK,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 6,
                            image: '',
                            foodTypes: [FoodType.SNACK]
                        }
                    ]
                },
                {
                    id: 5,
                    day: new Date(),
                    mealType: MealType.SWEET_TREAT,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 7,
                            image: '',
                            foodTypes: [FoodType.SWEET_TREAT]
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
                    day: new Date(),
                    mealType: MealType.BREAKFAST,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 8,
                            foodTypes: [FoodType.BREAKFAST]
                        },
                        {
                            ...mockFoods[0],
                            id: 9,
                            image: '',
                            foodTypes: [FoodType.BREAKFAST, FoodType.SIDE]
                        }
                    ]
                },
                {
                    id: 2,
                    day: new Date(),
                    mealType: MealType.LUNCH,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 10,
                            foodTypes: [FoodType.LUNCH]
                        }
                    ]
                },
                {
                    id: 3,
                    day: new Date(),
                    mealType: MealType.DINNER,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 11,
                            foodTypes: [FoodType.DINNER],
                            recipe: []
                        },
                        {
                            ...mockFoods[0],
                            id: 12,
                            image: '',
                            foodTypes: [FoodType.DINNER, FoodType.SIDE]
                        }
                    ]
                },
                {
                    id: 4,
                    day: new Date(),
                    mealType: MealType.SNACK,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 13,
                            image: '',
                            foodTypes: [FoodType.SNACK],
                            recipe: []
                        }
                    ]
                },
                {
                    id: 5,
                    day: new Date(),
                    mealType: MealType.SWEET_TREAT,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 14,
                            image: '',
                            foodTypes: [FoodType.SWEET_TREAT]
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
                    day: new Date(),
                    mealType: MealType.BREAKFAST,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 15,
                            foodTypes: [FoodType.BREAKFAST]
                        },
                        {
                            ...mockFoods[0],
                            id: 16,
                            image: '',
                            foodTypes: [FoodType.BREAKFAST, FoodType.SIDE]
                        }
                    ]
                },
                {
                    id: 2,
                    day: new Date(),
                    mealType: MealType.LUNCH,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 17,
                            foodTypes: [FoodType.LUNCH]
                        }
                    ]
                },
                {
                    id: 3,
                    day: new Date(),
                    mealType: MealType.DINNER,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 18,
                            foodTypes: [FoodType.DINNER]
                        },
                        {
                            ...mockFoods[0],
                            id: 19,
                            image: '',
                            foodTypes: [FoodType.DINNER, FoodType.SIDE]
                        }
                    ]
                },
                {
                    id: 4,
                    day: new Date(),
                    mealType: MealType.SNACK,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 20,
                            image: '',
                            foodTypes: [FoodType.SNACK]
                        }
                    ]
                },
                {
                    id: 5,
                    day: new Date(),
                    mealType: MealType.SWEET_TREAT,
                    foods: [
                        {
                            ...mockFoods[0],
                            id: 21,
                            image: '',
                            foodTypes: [FoodType.SWEET_TREAT]
                        }
                    ]
                }
            ]
        }
    ]
};