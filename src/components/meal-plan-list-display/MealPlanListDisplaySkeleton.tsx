import MealPlanCardSkeleton from "./meal-plan-card/MealPlanCardSkeleton";
import "./MealPlanListDisplay.css";

const MealPlanListDisplaySkeleton = () => {
  const arr = new Array(10).fill("");

  return (
    <div className="meal-plan-list-display-container">
      {arr.map((_, index: number) => (
        <div className="meal-plan-list-display-card-container" key={index}>
          <MealPlanCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default MealPlanListDisplaySkeleton;
