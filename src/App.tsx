import "./App.css";
import MealPlanDisplay from "./components/meal-plan-display/MealPlanDisplay";
import { Food } from "./models/Food";
import { FoodType } from "./models/FoodType";
import { MealPlan } from "./models/MealPlan";
import { MealType } from "./models/MealType";

const App = () => {
  const foods: Food[] = [
    {
      id: 0,
      title: "Spaghetti",
      recipie: "",
      servings: 4,
      calories: 600,
      foodTypes: [FoodType.DINNER],
      ingredient: [],
      image: "https://i.imgur.com/8ewJgNK.png"
    },
  ];

  const mealPlan: MealPlan = {
    id: 1,
    startDate: new Date(),
    endDate: new Date(),
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
                ...foods[0],
                id: 1,
                foodTypes: [FoodType.BREAKFAST]
              },
              {
                ...foods[0],
                id: 2,
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
                ...foods[0],
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
                ...foods[0],
                id: 4,
                foodTypes: [FoodType.DINNER]
              },
              {
                ...foods[0],
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
                ...foods[0],
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
                ...foods[0],
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
                ...foods[0],
                id: 1,
                foodTypes: [FoodType.BREAKFAST]
              },
              {
                ...foods[0],
                id: 2,
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
                ...foods[0],
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
                ...foods[0],
                id: 4,
                foodTypes: [FoodType.DINNER]
              },
              {
                ...foods[0],
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
                ...foods[0],
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
                ...foods[0],
                id: 7,
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
                ...foods[0],
                id: 1,
                foodTypes: [FoodType.BREAKFAST]
              },
              {
                ...foods[0],
                id: 2,
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
                ...foods[0],
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
                ...foods[0],
                id: 4,
                foodTypes: [FoodType.DINNER]
              },
              {
                ...foods[0],
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
                ...foods[0],
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
                ...foods[0],
                id: 7,
                image: '',
                foodTypes: [FoodType.SWEET_TREAT]
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <MealPlanDisplay mealPlan={mealPlan}></MealPlanDisplay>
      </div>
    </div>
  );
};

export default App;
