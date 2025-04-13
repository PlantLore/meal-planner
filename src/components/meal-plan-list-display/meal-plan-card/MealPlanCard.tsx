import { Card } from "@mui/material";
import { MealPlan } from "../../../models/MealPlan";
import "./MealPlanCard.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const MealPlanCard = ({ mealPlan }: { mealPlan: MealPlan; }) => {
  const [mealPlanImages, setMealPlanImages] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const mealPlanImagesTemp: string[] = [];
    outerloop: for (let i = 0; i < mealPlan.mealPlanDays.length; i++) {
      for (let j = 0; j < mealPlan.mealPlanDays[i].meals.length; j++) {
        for (
          let k = 0;
          k < mealPlan.mealPlanDays[i].meals[j].recipes.length;
          k++
        ) {
          if (mealPlan.mealPlanDays[i].meals[j].recipes[k].image)
            mealPlanImagesTemp.push(
              mealPlan.mealPlanDays[i].meals[j].recipes[k].image
            );
          if (mealPlanImagesTemp.length >= 3) break outerloop;
        }
      }
    }
    setMealPlanImages(mealPlanImagesTemp);
  }, [mealPlan.mealPlanDays]);

  const handleClick = () => {
    navigate("/mealplans/" + mealPlan.id);
  };

  return (
    <Card
      onClick={handleClick}
      className="meal-plan-card"
      raised={false}
      sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}
    >
      <div className="meal-plan-card-content">
        <div className="meal-plan-card-date-container">
          <h3
            className="meal-plan-card-date"
            style={new Date() > mealPlan.endDate ? { color: "gray" } : {}}
          >
            {mealPlan.startDate.toLocaleDateString()} -{" "}
            {mealPlan.endDate.toLocaleDateString()}
          </h3>
          <i>
            {Math.round(
              (mealPlan.endDate.getTime() - mealPlan.startDate.getTime()) /
              (24 * 60 * 60 * 1000)
            ) + 1}{" "}
            days
          </i>
        </div>
        {mealPlanImages.length ? (
          <div className="meal-plan-card-image-container">
            {mealPlanImages.map((imgUrl: string, index: number) => (
              <img
                src={imgUrl}
                alt="recipe"
                className="meal-plan-card-image"
                key={index}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default MealPlanCard;
