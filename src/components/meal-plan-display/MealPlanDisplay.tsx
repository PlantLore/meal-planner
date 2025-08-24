import { LocalFireDepartmentOutlined } from "@mui/icons-material";
import { MealPlan } from "../../models/MealPlan";
import { MealPlanDay } from "../../models/MealPlanDay";
import MealPlanDayDisplay from "./meal-plan-day-display/MealPlanDayDisplay";
import "./MealPlanDisplay.css";
import RecipeFact from "../recipe-card/recipe-fact/RecipeFact";

const MealPlanDisplay = ({ mealPlan }: { mealPlan: MealPlan; }) => {
  const sortedMealPlanDays = [...mealPlan.mealPlanDays].sort((current, next) => current.day > next.day ? 1 : -1);

  const currentMeals = sortedMealPlanDays.filter((mealPlanDay) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return mealPlanDay.day >= today;
  });

  const previousMeals = sortedMealPlanDays.filter((mealPlanDay) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return mealPlanDay.day < today;
  });

  const calculateCalories = (mealPlanDay: MealPlanDay): number => {
    return mealPlanDay.meals.reduce(
      (total, meal) =>
        total + meal.mealRecipes.reduce(
          (total, mealRecipe) =>
            total + mealRecipe.recipe.calories, 0
        )
      , 0);
  }

  return <>
    {currentMeals.map((mealPlanDay) =>
      <div className="meal-plan-day-display-container" key={mealPlanDay.id}>
        <h1 className="meal-plan-display-date-title">
          {mealPlanDay.day.toLocaleDateString() === new Date().toLocaleDateString() ?
            "Today's Meals" :
            mealPlanDay.day.toLocaleDateString()
          }
          <span className="meal-plan-display-total-calories-container">
            <RecipeFact tooltip={"Total Calories"} icon={<LocalFireDepartmentOutlined />} value={calculateCalories(mealPlanDay)}></RecipeFact>
          </span>
        </h1>
        <MealPlanDayDisplay mealPlanDay={mealPlanDay}></MealPlanDayDisplay>
      </div>
    )}
    <h1 className="meal-plan-display-previous-date-title meal-plan-display-date-title">Previous Meals</h1>
    {previousMeals.map((mealPlanDay) =>
      <div className="meal-plan-day-display-container" key={mealPlanDay.id}>
        <h1 className="meal-plan-display-previous-date-title meal-plan-display-date-title"> 
          {mealPlanDay.day.toLocaleDateString()} 
          <span className="meal-plan-display-total-calories-container">
            <RecipeFact tooltip={"Total Calories"} icon={<LocalFireDepartmentOutlined />} value={calculateCalories(mealPlanDay)}></RecipeFact>
          </span>
        </h1>
        <MealPlanDayDisplay mealPlanDay={mealPlanDay}></MealPlanDayDisplay>
      </div>
    )}
  </>;
};

export default MealPlanDisplay;
