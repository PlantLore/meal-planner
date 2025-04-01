import { useState } from "react";
import { MealPlanDay } from "../../../models/MealPlanDay";
import "./MealPlanDayEdit.css";
import MealPlanColumnEdit from "../meal-plan-column-edit/MealPlanColumnEdit";
import { MealType } from "../../../models/MealType";
import { Food } from "../../../models/Food";
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

  const getMealFoods = (mealType: MealType): Food[] => {
    return (
      mealPlanDay.meals.find((meal: Meal) => meal.mealType === mealType)
        ?.foods || []
    );
  };

  const mealPlanColumnChange = (mealType: MealType, foods: Food[]) => {
    const newMealPlanDay = { ...mealPlanDay };
    const mealPlanMeals = newMealPlanDay.meals.find(
      (meal: Meal) => meal.mealType === mealType
    );
    if (mealPlanMeals) {
      mealPlanMeals.foods = foods;
    } else {
      newMealPlanDay.meals.push({
        ...new Meal(),
        foods: foods,
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
          initialFoods={getMealFoods(MealType.BREAKFAST)}
          mealType={MealType.BREAKFAST}
          mealPlanColumnChange={(foods: Food[]) => {
            mealPlanColumnChange(MealType.BREAKFAST, foods);
          }}
        ></MealPlanColumnEdit>
      </span>
      <span className="meal-plan-day-edit-column">
        <MealPlanColumnEdit
          initialFoods={getMealFoods(MealType.LUNCH)}
          mealType={MealType.LUNCH}
          mealPlanColumnChange={(foods: Food[]) => {
            mealPlanColumnChange(MealType.LUNCH, foods);
          }}
        ></MealPlanColumnEdit>
      </span>
      <span className="meal-plan-day-edit-column">
        <MealPlanColumnEdit
          initialFoods={getMealFoods(MealType.DINNER)}
          mealType={MealType.DINNER}
          mealPlanColumnChange={(foods: Food[]) => {
            mealPlanColumnChange(MealType.DINNER, foods);
          }}
        ></MealPlanColumnEdit>
      </span>
      <span className="meal-plan-day-edit-column">
        <MealPlanColumnEdit
          initialFoods={getMealFoods(MealType.SNACK)}
          mealType={MealType.SNACK}
          mealPlanColumnChange={(foods: Food[]) => {
            mealPlanColumnChange(MealType.SNACK, foods);
          }}
        ></MealPlanColumnEdit>
        <MealPlanColumnEdit
          initialFoods={getMealFoods(MealType.SWEET_TREAT)}
          mealType={MealType.SWEET_TREAT}
          mealPlanColumnChange={(foods: Food[]) => {
            mealPlanColumnChange(MealType.SWEET_TREAT, foods);
          }}
        ></MealPlanColumnEdit>
      </span>
    </div>
  );
};

export default MealPlanDayEdit;
