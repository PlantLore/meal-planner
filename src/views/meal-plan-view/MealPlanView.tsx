import { CircularProgress } from "@mui/material";
import MealPlanDisplay from "../../components/meal-plan-display/MealPlanDisplay";
import { MealPlan } from "../../models/MealPlan";
import { getMealPlan } from "../../services/mealPlanService";
import "./MealPlanView.css";
import * as React from 'react';
import NavBar from "../../components/nav-bar/NavBar";

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
            <h1 className="meal-plan-view-title">{mealPlan?.startDate.toLocaleDateString()} - {mealPlan?.endDate.toLocaleDateString()}</h1>
            <div className="meal-plan-view-display-container">
                {mealPlan ? <MealPlanDisplay mealPlan={mealPlan} /> : <CircularProgress color="success" />}
            </div>
        </div>
    </div>;
};

export default MealPlanView;