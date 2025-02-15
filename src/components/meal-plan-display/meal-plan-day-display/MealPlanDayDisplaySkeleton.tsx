import MealPlanColumnSkeleton from '../meal-plan-column/MealPlanColumnSkeleton';
import './MealPlanDayDisplay.css';

const MealPlanDayDisplaySkeleton = () => {
    return <div
        className="meal-plan-day-container"
    >
        <span className="meal-plan-day-column">
            <MealPlanColumnSkeleton />
        </span>
        <span className="meal-plan-day-column">
            <MealPlanColumnSkeleton />
        </span>
        <span className="meal-plan-day-column">
            <MealPlanColumnSkeleton />
        </span>
        <span className="meal-plan-day-column">
            <MealPlanColumnSkeleton />
        </span>
    </div>;
};

export default MealPlanDayDisplaySkeleton;