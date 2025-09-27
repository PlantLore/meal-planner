import { useEffect, useState } from "react";
import { MealPlan } from "../../models/MealPlan";
import "./MealPlanListView.css";
import { getMealPlans } from "../../services/mealPlanService";
import MealPlanListDisplay from "../../components/meal-plan-list-display/MealPlanListDisplay";
import { Pagination } from "@mui/material";
import MealPlanListDisplaySkeleton from "../../components/meal-plan-list-display/MealPlanListDisplaySkeleton";

const MealPlanListView = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setTimeout(() => {
      setMealPlans(getMealPlans());
      setLoading(false);
    }, 250);
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="max-page-content">
      {!loading ? (
        <MealPlanListDisplay
          mealPlans={mealPlans.slice((page - 1) * 10, page * 10)}
        />
      ) : (
        <MealPlanListDisplaySkeleton />
      )}
      {mealPlans.length / 10 > 1 ? (
        <div className="meal-plan-list-view-pagination-container">
          <Pagination
            color="primary"
            count={Math.ceil(mealPlans.length / 10)}
            onChange={handleChange}
          ></Pagination>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MealPlanListView;
