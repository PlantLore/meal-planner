import { Card } from "@mui/material";
import { MealPlan } from "../../models/MealPlan";
import MealPlanDayDisplay from "./meal-plan-day-display/MealPlanDayDisplay";
import "./MealPlanDisplay.css";

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

  return <Card raised={false} sx={{ borderRadius: ".25rem" }}>
    {currentMeals.map((mealPlanDay) =>
      <div className="meal-plan-day-display-container" key={mealPlanDay.id}>
        <h2 className="meal-plan-display-date-title">
          {mealPlanDay.day.toLocaleDateString() === new Date().toLocaleDateString() ?
            "Today's Meals" :
            mealPlanDay.day.toLocaleDateString()
          }</h2>
        <MealPlanDayDisplay mealPlanDay={mealPlanDay}></MealPlanDayDisplay>
      </div>
    )}
    <h2 className="meal-plan-display-previous-date-title meal-plan-display-date-title">Previous Meals</h2>
    {previousMeals.map((mealPlanDay) =>
      <div className="meal-plan-day-display-container" key={mealPlanDay.id}>
        <h2 className="meal-plan-display-previous-date-title meal-plan-display-date-title"> {mealPlanDay.day.toLocaleDateString()} </h2>
        <MealPlanDayDisplay mealPlanDay={mealPlanDay}></MealPlanDayDisplay>
      </div>
    )}
  </Card>;
};

export default MealPlanDisplay;
