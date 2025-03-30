import { useEffect, useState } from 'react';
import MealPlanUpsert from '../../components/meal-plan-upsert/MealPlanUpsert';
import { MealPlan } from '../../models/MealPlan';
import './MealPlanUpsertView.css';
import { useParams } from 'react-router';
import { getMealPlanById, upsertMealPlan } from '../../services/mealPlanService';

const MealPlanUpsertView = () => {
    const [mealPlan, setMealPlan] = useState<MealPlan>(new MealPlan());
    const [loading, setLoading] = useState<boolean>(true);
    let { mealPlanId } = useParams();

    const handleMealPlanUpsert = (updatedMealPlan: MealPlan) => {
        setMealPlan(upsertMealPlan(updatedMealPlan));
    };

    useEffect(() => {
        if (mealPlanId) {
            setTimeout(() => {
                mealPlanId && setMealPlan(getMealPlanById(+mealPlanId));
                setLoading(false);
            }, 250);
        }
        else {
            setLoading(false);
        }
    }, [mealPlanId]);

    return <div className="meal-plan-upsert-view-container">
        <div className="max-page-content">
            {!loading ? <MealPlanUpsert initialMealPlan={mealPlan}></MealPlanUpsert> : <></>}
        </div>
    </div>;
};

export default MealPlanUpsertView;