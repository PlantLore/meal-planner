import { Skeleton } from '@mui/material';
import './MealPlanDisplay.css';
import MealPlanDayDisplaySkeleton from './meal-plan-day-display/MealPlanDayDisplaySkeleton';

const MealPlanDisplaySkeleton = () => {
    return <div className="meal-plan-day-display-container">
        <Skeleton variant="text" sx={{ fontSize: '3em', width: '15rem', }} />
        <MealPlanDayDisplaySkeleton />
    </div>;
};

export default MealPlanDisplaySkeleton;