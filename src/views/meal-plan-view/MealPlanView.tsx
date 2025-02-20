import { Skeleton } from "@mui/material";
import MealPlanDisplay from "../../components/meal-plan-display/MealPlanDisplay";
import { MealPlan } from "../../models/MealPlan";
import { getMealPlan } from "../../services/mealPlanService";
import "./MealPlanView.css";
import MealPlanDisplaySkeleton from "../../components/meal-plan-display/MealPlanDisplaySkeleton";
import { useEffect, useState } from "react";

const MealPlanView = () => {
    const [mealPlan, setMealPlan] = useState<MealPlan>();

    useEffect(() => {
        setTimeout(() => {
            setMealPlan(getMealPlan());
        }, 250);
    }, []);

    return <div className="meal-plan-view-container">
        <div className="max-page-content">
            <h1 className="meal-plan-view-title">Meal Plan</h1>
            {mealPlan ? <h1 className="meal-plan-view-title">{mealPlan?.startDate.toLocaleDateString()} - {mealPlan?.endDate.toLocaleDateString()}</h1> :
                <div style={{ display: 'flex', justifyContent: 'center' }}><Skeleton variant="text" sx={{ fontSize: '3em', width: '20rem' }} /></div>}
            <div className="meal-plan-view-display-container">
                {mealPlan ? <MealPlanDisplay mealPlan={mealPlan} /> : <><MealPlanDisplaySkeleton /> <MealPlanDisplaySkeleton /></>}
            </div>
        </div>
    </div>;
};

export default MealPlanView;