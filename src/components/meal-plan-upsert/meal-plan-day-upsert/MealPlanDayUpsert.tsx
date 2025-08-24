import { useState } from "react";
import { MealPlanDay } from "../../../models/MealPlanDay";
import "./MealPlanDayUpsert.css";
import MealPlanColumnUpsert from "../meal-plan-column-upsert/MealPlanColumnUpsert";
import { MealType } from "../../../models/MealType";
import { Meal } from "../../../models/Meal";
import { MealRecipe } from "../../../models/MealRecipe";
import { Droppable } from "../../droppable/Droppable";

const MealPlanDayUpsert = ({
  initialMealPlanDay,
  mealPlanDayChange,
  setMealRecipeIdCounter
}: {
  initialMealPlanDay: MealPlanDay;
  mealPlanDayChange: (mealPlanDay: MealPlanDay) => void;
  setMealRecipeIdCounter: (value: React.SetStateAction<number>) => void;
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
          <MealPlanColumnUpsert
            initialRecipes={getMealRecipes(MealType.BREAKFAST)}
            mealType={MealType.BREAKFAST}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.BREAKFAST, mealRecipes);
            }}
            setMealRecipeIdCounter={setMealRecipeIdCounter}
          ></MealPlanColumnUpsert>
        </Droppable>
      </span>
      <span className="meal-plan-day-edit-column">
        <Droppable id={getMealId(MealType.LUNCH)}>
          <MealPlanColumnUpsert
            initialRecipes={getMealRecipes(MealType.LUNCH)}
            mealType={MealType.LUNCH}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.LUNCH, mealRecipes);
            }}
            setMealRecipeIdCounter={setMealRecipeIdCounter}
          ></MealPlanColumnUpsert>
        </Droppable>
      </span>
      <span className="meal-plan-day-edit-column">
        <Droppable id={getMealId(MealType.DINNER)}>
          <MealPlanColumnUpsert
            initialRecipes={getMealRecipes(MealType.DINNER)}
            mealType={MealType.DINNER}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.DINNER, mealRecipes);
            }}
            setMealRecipeIdCounter={setMealRecipeIdCounter}
          ></MealPlanColumnUpsert>
        </Droppable>
      </span>
      <span className="meal-plan-day-edit-column">
        <Droppable id={getMealId(MealType.SNACK)}>
          <MealPlanColumnUpsert
            initialRecipes={getMealRecipes(MealType.SNACK)}
            mealType={MealType.SNACK}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.SNACK, mealRecipes);
            }}
            setMealRecipeIdCounter={setMealRecipeIdCounter}
          ></MealPlanColumnUpsert>
        </Droppable>
        <Droppable id={getMealId(MealType.SWEET_TREAT)}>
          <MealPlanColumnUpsert
            initialRecipes={getMealRecipes(MealType.SWEET_TREAT)}
            mealType={MealType.SWEET_TREAT}
            mealPlanColumnChange={(mealRecipes: MealRecipe[]) => {
              mealPlanColumnChange(MealType.SWEET_TREAT, mealRecipes);
            }}
            setMealRecipeIdCounter={setMealRecipeIdCounter}
          ></MealPlanColumnUpsert>
        </Droppable>
      </span>
    </div>
  );
};

export default MealPlanDayUpsert;
