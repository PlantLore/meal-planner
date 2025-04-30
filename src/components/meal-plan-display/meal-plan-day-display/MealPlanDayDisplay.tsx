import "./MealPlanDayDisplay.css";
import { MealPlanDay } from "../../../models/MealPlanDay";
import MealPlanColumn from "../meal-plan-column/MealPlanColumn";
import { MealType } from "../../../models/MealType";
import { MealRecipe } from "../../../models/MealRecipe";

const MealPlanDayDisplay = ({ mealPlanDay }: { mealPlanDay: MealPlanDay; }) => {
  const getMealRecipes = (mealType: MealType): MealRecipe[] => {
    return mealPlanDay.meals.find((meal) => meal.mealType === mealType)?.mealRecipes || [];
  };

  return (
    <div
      className="meal-plan-day-container"
    >
      <span className="meal-plan-day-column">
        <MealPlanColumn recipes={getMealRecipes(MealType.BREAKFAST)} mealType={MealType.BREAKFAST}></MealPlanColumn>
      </span>
      <span className="meal-plan-day-column">
        <MealPlanColumn recipes={getMealRecipes(MealType.LUNCH)} mealType={MealType.LUNCH}></MealPlanColumn>
      </span>
      <span className="meal-plan-day-column">
        <MealPlanColumn recipes={getMealRecipes(MealType.DINNER)} mealType={MealType.DINNER}></MealPlanColumn>
      </span>
      <span className="meal-plan-day-column">
        <MealPlanColumn recipes={getMealRecipes(MealType.SNACK)} mealType={MealType.SNACK}></MealPlanColumn>
        <MealPlanColumn recipes={getMealRecipes(MealType.SWEET_TREAT)} mealType={MealType.SWEET_TREAT}></MealPlanColumn>
      </span>
    </div>
  );
};

export default MealPlanDayDisplay;
