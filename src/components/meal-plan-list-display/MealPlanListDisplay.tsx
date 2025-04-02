import { MealPlan } from "../../models/MealPlan";
import MealPlanCard from "./meal-plan-card/MealPlanCard";
import "./MealPlanListDisplay.css";

const MealPlanListDisplay = ({ mealPlans }: { mealPlans: MealPlan[] }) => {
  return (
    <div className="meal-plan-list-display-container">
      {mealPlans.map((mealPlan: MealPlan) => (
        <div
          className="meal-plan-list-display-card-container"
          key={mealPlan.id}
        >
          <MealPlanCard mealPlan={mealPlan} />
        </div>
      ))}
      {mealPlans.length === 0 ? <i>No Meal Plans to Display</i> : <></>}
    </div>
  );
};

export default MealPlanListDisplay;
