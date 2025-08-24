import { useEffect, useState } from "react";
import MealPlanUpsert from "../../components/meal-plan-upsert/MealPlanUpsert";
import { MealPlan } from "../../models/MealPlan";
import "./MealPlanUpsertView.css";
import { useNavigate, useParams } from "react-router";
import {
  getMealPlanById,
  upsertMealPlan,
} from "../../services/mealPlanService";
import { Skeleton } from "@mui/material";
import MealPlanDisplaySkeleton from "../../components/meal-plan-display/MealPlanDisplaySkeleton";

const MealPlanUpsertView = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(new MealPlan());
  const [loading, setLoading] = useState<boolean>(true);
  let { mealPlanId } = useParams();
  const navigate = useNavigate();

  const handleMealPlanEdit = (updatedMealPlan: MealPlan) => {
    const newMealPlan = upsertMealPlan(updatedMealPlan)
    setMealPlan(newMealPlan);
    navigate("/mealplans/" + newMealPlan.id);
  };

  useEffect(() => {
    if (mealPlanId) {
      setTimeout(() => {
        mealPlanId && setMealPlan(getMealPlanById(+mealPlanId));
        setLoading(false);
      }, 250);
    } else {
      setLoading(false);
    }
  }, [mealPlanId]);

  return (
    <div className="meal-plan-edit-view-container">
      <div className="max-page-content">
        <div className="meal-plan-edit-view-title-container">
          <h1 className="meal-plan-edit-view-title">Meal Plan</h1>
        </div>
        {!loading ? (
          <MealPlanUpsert
            initialMealPlan={mealPlan}
            onSubmit={handleMealPlanEdit}
          ></MealPlanUpsert>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Skeleton
                variant="text"
                sx={{ fontSize: "5em", width: "35rem" }}
              />
            </div>
            <MealPlanDisplaySkeleton /> <MealPlanDisplaySkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default MealPlanUpsertView;
