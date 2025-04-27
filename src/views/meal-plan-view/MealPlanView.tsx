import { IconButton, Skeleton } from "@mui/material";
import MealPlanDisplay from "../../components/meal-plan-display/MealPlanDisplay";
import { MealPlan } from "../../models/MealPlan";
import { getMealPlanById } from "../../services/mealPlanService";
import "./MealPlanView.css";
import MealPlanDisplaySkeleton from "../../components/meal-plan-display/MealPlanDisplaySkeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Edit, LocalGroceryStore } from "@mui/icons-material";

const MealPlanView = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>();

  let { mealPlanId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      mealPlanId
        ? setMealPlan(getMealPlanById(+mealPlanId))
        : setMealPlan(getMealPlanById(1));
    }, 250);
  }, [mealPlanId]);

  return (
    <div className="meal-plan-view-container">
      <div className="max-page-content">
        <div className="meal-plan-view-title-container">
          {mealPlan ? (
            <span className="meal-plan-view-flex-spacer"></span>
          ) : (
            <></>
          )}
          <h1 className="meal-plan-view-title">Meal Plan</h1>
          {mealPlan ? (
            <span className="meal-plan-view-edit-button meal-plan-view-flex-spacer">
              <Link
                to={`/mealplans/edit/${mealPlan.id}`}
                className="no-link-style"
              >
                <IconButton
                  sx={(theme) => ({
                    color: theme.palette.grey[500],
                  })}
                >
                  <Edit />
                </IconButton>
              </Link>
              <Link
                to={`/grocerylist/mealplan/${mealPlan.id}`}
                className="no-link-style"
              >
                <IconButton
                  sx={(theme) => ({
                    color: theme.palette.grey[500],
                  })}
                >
                  <LocalGroceryStore />
                </IconButton>
              </Link>
            </span>
          ) : (
            <></>
          )}
        </div>
        {mealPlan ? (
          <h1 className="meal-plan-view-title meal-plan-view-date">
            {mealPlan?.startDate.toLocaleDateString()} -{" "}
            {mealPlan?.endDate.toLocaleDateString()}
          </h1>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Skeleton variant="text" sx={{ fontSize: "3em", width: "20rem" }} />
          </div>
        )}
        <div className="meal-plan-view-display-container">
          {mealPlan ? (
            <MealPlanDisplay mealPlan={mealPlan} />
          ) : (
            <>
              <MealPlanDisplaySkeleton /> <MealPlanDisplaySkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanView;
