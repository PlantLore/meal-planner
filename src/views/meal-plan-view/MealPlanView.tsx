import { Skeleton } from "@mui/material";
import MealPlanDisplay from "../../components/meal-plan-display/MealPlanDisplay";
import { MealPlan } from "../../models/MealPlan";
import { getMealPlan } from "../../services/mealPlanService";
import "./MealPlanView.css";
import * as React from 'react';
import NavBar from "../../components/nav-bar/NavBar";
import MealPlanDisplaySkeleton from "../../components/meal-plan-display/MealPlanDisplaySkeleton";

const MealPlanView = () => {
    const [mealPlan, setMealPlan] = React.useState<MealPlan>();

    React.useEffect(() => {
        setTimeout(() => {

            setMealPlan(getMealPlan());
        }, 2000);
    }, []);

    return <div className="meal-plan-view-container">
        <NavBar />
        <div className="max-page-content">
            <h1 className="meal-plan-view-title">Meal Plan</h1>
            {mealPlan ? <h1 className="meal-plan-view-title">{mealPlan?.startDate.toLocaleDateString()} - {mealPlan?.endDate.toLocaleDateString()}</h1> :
                <div style={{ display: 'flex', justifyContent: 'center' }}><Skeleton variant="text" sx={{ fontSize: '3em', width: '20rem', }} /></div>}
            <div className="meal-plan-view-display-container">
                {mealPlan ? <MealPlanDisplay mealPlan={mealPlan} /> : <><MealPlanDisplaySkeleton /> <MealPlanDisplaySkeleton /></>}
            </div>
        </div>
    </div>;
};

export default MealPlanView;