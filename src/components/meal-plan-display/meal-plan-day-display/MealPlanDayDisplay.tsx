import "./MealPlanDayDisplay.css";
import { MealPlanDay } from "../../../models/MealPlanDay";
import MealPlanColumn from "../meal-plan-column/MealPlanColumn";
import { MealType } from "../../../models/MealType";
import { Food } from "../../../models/Food";

const MealPlanDayDisplay = ({ mealPlanDay }: { mealPlanDay: MealPlanDay; }) => {
  const getMealFoods = (mealType: MealType): Food[] => {
    return mealPlanDay.meals.find((meal) => meal.mealType === mealType)?.foods || [];
  };

  return (
    <div
      className="meal-plan-day-container"
    >
      <span className="meal-plan-day-column">
        <MealPlanColumn foods={getMealFoods(MealType.BREAKFAST)} mealType={MealType.BREAKFAST}></MealPlanColumn>
      </span>
      <span className="meal-plan-day-column">
        <MealPlanColumn foods={getMealFoods(MealType.LUNCH)} mealType={MealType.LUNCH}></MealPlanColumn>
      </span>
      <span className="meal-plan-day-column">
        <MealPlanColumn foods={getMealFoods(MealType.DINNER)} mealType={MealType.DINNER}></MealPlanColumn>
      </span>
      <span className="meal-plan-day-column">
        <MealPlanColumn foods={getMealFoods(MealType.SNACK)} mealType={MealType.SNACK}></MealPlanColumn>
        <MealPlanColumn foods={getMealFoods(MealType.SWEET_TREAT)} mealType={MealType.SWEET_TREAT}></MealPlanColumn>
      </span>
    </div>
  );
};

export default MealPlanDayDisplay;
