import { useState } from "react";
import { MealPlanDay } from "../../../models/MealPlanDay";
import "./MealPlanDayEdit.css";
import MealPlanColumnEdit from "../meal-plan-column-edit/MealPlanColumnEdit";
import { MealType } from "../../../models/MealType";
import { Recipe } from "../../../models/Recipe";
import { Meal } from "../../../models/Meal";

const MealPlanDayEdit = ({
  initialMealPlanDay,
  mealPlanDayChange,
}: {
  initialMealPlanDay: MealPlanDay;
  mealPlanDayChange: (mealPlanDay: MealPlanDay) => void;
}) => {
  const [mealPlanDay, setMealPlanDay] =
    useState<MealPlanDay>(initialMealPlanDay);

  const getMealRecipes = (mealType: MealType): Recipe[] => {
    return (
      mealPlanDay.meals.find((meal: Meal) => meal.mealType === mealType)
        ?.recipes || []
    );
  };

  const mealPlanColumnChange = (mealType: MealType, recipes: Recipe[]) => {
    const newMealPlanDay = { ...mealPlanDay };
    const mealPlanMeals = newMealPlanDay.meals.find(
      (meal: Meal) => meal.mealType === mealType
    );
    if (mealPlanMeals) {
      mealPlanMeals.recipes = recipes;
    } else {
      newMealPlanDay.meals.push({
        ...new Meal(),
        recipes: recipes,
        mealType: mealType,
      });
    }

    setMealPlanDay(newMealPlanDay);
    mealPlanDayChange(newMealPlanDay);
  };

  return (
    <div className="meal-plan-day-edit-container">
      <span className="meal-plan-day-edit-column">
        <MealPlanColumnEdit
          initialRecipes={getMealRecipes(MealType.BREAKFAST)}
          mealType={MealType.BREAKFAST}
          mealPlanColumnChange={(recipes: Recipe[]) => {
            mealPlanColumnChange(MealType.BREAKFAST, recipes);
          }}
        ></MealPlanColumnEdit>
      </span>
      <span className="meal-plan-day-edit-column">
        <MealPlanColumnEdit
          initialRecipes={getMealRecipes(MealType.LUNCH)}
          mealType={MealType.LUNCH}
          mealPlanColumnChange={(recipes: Recipe[]) => {
            mealPlanColumnChange(MealType.LUNCH, recipes);
          }}
        ></MealPlanColumnEdit>
      </span>
      <span className="meal-plan-day-edit-column">
        <MealPlanColumnEdit
          initialRecipes={getMealRecipes(MealType.DINNER)}
          mealType={MealType.DINNER}
          mealPlanColumnChange={(recipes: Recipe[]) => {
            mealPlanColumnChange(MealType.DINNER, recipes);
          }}
        ></MealPlanColumnEdit>
      </span>
      <span className="meal-plan-day-edit-column">
        <MealPlanColumnEdit
          initialRecipes={getMealRecipes(MealType.SNACK)}
          mealType={MealType.SNACK}
          mealPlanColumnChange={(recipes: Recipe[]) => {
            mealPlanColumnChange(MealType.SNACK, recipes);
          }}
        ></MealPlanColumnEdit>
        <MealPlanColumnEdit
          initialRecipes={getMealRecipes(MealType.SWEET_TREAT)}
          mealType={MealType.SWEET_TREAT}
          mealPlanColumnChange={(recipes: Recipe[]) => {
            mealPlanColumnChange(MealType.SWEET_TREAT, recipes);
          }}
        ></MealPlanColumnEdit>
      </span>
    </div>
  );
};

export default MealPlanDayEdit;
