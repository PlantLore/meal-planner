import { useState } from "react";
import { MealPlanDay } from "../../../models/MealPlanDay";
import "./MealPlanDayEdit.css";
import MealPlanColumnEdit from "../meal-plan-column-edit/MealPlanColumnEdit";
import { MealType } from "../../../models/MealType";
import { Meal } from "../../../models/Meal";
import { MealRecipe } from "../../../models/MealRecipe";
import { Droppable } from "../../droppable/Droppable";

const MealPlanDayEdit = ({
  initialMealPlanDay,
  mealPlanDayChange,
}: {
  initialMealPlanDay: MealPlanDay;
  mealPlanDayChange: (mealPlanDay: MealPlanDay) => void;
}) => {
  const [mealPlanDay, setMealPlanDay] =
    useState<MealPlanDay>(initialMealPlanDay);

  const getMealRecipes = (mealType: MealType): MealRecipe[] => {
    return (
      mealPlanDay.meals.find((meal: Meal) => meal.mealType === mealType)
        ?.mealRecipes || []
    );
  };

  const getMealId = (mealType: MealType): number => {
    return (
      mealPlanDay.meals.find((meal: Meal) => meal.mealType === mealType)
        ?.id || 0
    );
  };

  const mealPlanColumnChange = (mealType: MealType, mealRecipes: MealRecipe[]) => {
    const newMealPlanDay = { ...mealPlanDay };
    const mealPlanMeals = newMealPlanDay.meals.find(
      (meal: Meal) => meal.mealType === mealType
    );
    if (mealPlanMeals) {
      mealPlanMeals.mealRecipes = mealRecipes;
    } else {
      newMealPlanDay.meals.push({
        ...new Meal(),
        mealRecipes: mealRecipes,
        mealType: mealType,
      });
    }

    setMealPlanDay(newMealPlanDay);
    mealPlanDayChange(newMealPlanDay);
  };

  return (
    <div className="meal-plan-day-edit-container">
      <span className="meal-plan-day-edit-column">
        <Droppable id={getMealId(MealType.BREAKFAST)}>
          <MealPlanColumnEdit
            initialRecipes={getMealRecipes(MealType.BREAKFAST)}
            mealType={MealType.BREAKFAST}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.BREAKFAST, mealRecipes);
            }}
          ></MealPlanColumnEdit>
        </Droppable>
      </span>
      <span className="meal-plan-day-edit-column">
        <Droppable id={getMealId(MealType.LUNCH)}>
          <MealPlanColumnEdit
            initialRecipes={getMealRecipes(MealType.LUNCH)}
            mealType={MealType.LUNCH}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.LUNCH, mealRecipes);
            }}
          ></MealPlanColumnEdit>
        </Droppable>
      </span>
      <span className="meal-plan-day-edit-column">
        <Droppable id={getMealId(MealType.DINNER)}>
          <MealPlanColumnEdit
            initialRecipes={getMealRecipes(MealType.DINNER)}
            mealType={MealType.DINNER}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.DINNER, mealRecipes);
            }}
          ></MealPlanColumnEdit>
        </Droppable>
      </span>
      <span className="meal-plan-day-edit-column">
        <Droppable id={getMealId(MealType.SNACK)}>
          <MealPlanColumnEdit
            initialRecipes={getMealRecipes(MealType.SNACK)}
            mealType={MealType.SNACK}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.SNACK, mealRecipes);
            }}
          ></MealPlanColumnEdit>
        </Droppable>
        <Droppable id={getMealId(MealType.SWEET_TREAT)}>
          <MealPlanColumnEdit
            initialRecipes={getMealRecipes(MealType.SWEET_TREAT)}
            mealType={MealType.SWEET_TREAT}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.SWEET_TREAT, mealRecipes);
            }}
          ></MealPlanColumnEdit>
        </Droppable>
      </span>
    </div>
  );
};

export default MealPlanDayEdit;
