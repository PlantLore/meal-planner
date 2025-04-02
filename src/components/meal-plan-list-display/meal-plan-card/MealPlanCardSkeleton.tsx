import { Skeleton } from "@mui/material";
import "./MealPlanCard.css";

const MealPlanCardSkeleton = () => {
  return <Skeleton variant="rounded" sx={{ width: "50rem", height: "5rem" }} />;
};

export default MealPlanCardSkeleton;
