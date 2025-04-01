import { useEffect, useState } from "react";
import MealPlanEdit from "../../components/meal-plan-edit/MealPlanEdit";
import { MealPlan } from "../../models/MealPlan";
import "./MealPlanEditView.css";
import { useNavigate, useParams } from "react-router";
import {
  getMealPlanById,
  upsertMealPlan,
} from "../../services/mealPlanService";
import { Skeleton } from "@mui/material";
import MealPlanDisplaySkeleton from "../../components/meal-plan-display/MealPlanDisplaySkeleton";

const MealPlanEditView = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(new MealPlan());
  const [loading, setLoading] = useState<boolean>(true);
  let { mealPlanId } = useParams();
  const navigate = useNavigate();

  const handleMealPlanEdit = (updatedMealPlan: MealPlan) => {
    setMealPlan(upsertMealPlan(updatedMealPlan));
    navigate("/mealplans/" + updatedMealPlan.id);
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
          <MealPlanEdit
            initialMealPlan={mealPlan}
            onSubmit={handleMealPlanEdit}
          ></MealPlanEdit>
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

export default MealPlanEditView;
