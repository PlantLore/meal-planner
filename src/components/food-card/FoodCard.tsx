import "./FoodCard.css";
import { Card } from "@mui/material";
import { Food } from "../../models/Food";
import { FoodType } from "../../models/FoodType";
import { MealType } from "../../models/MealType";
import FoodFactArray from "./food-fact-array/FoodFactArray";

const FoodCard = ({ food, mealType }: { food: Food, mealType: MealType; }) => {
  const getFoodTypeClass = (): string => {
    if (mealType === MealType.DINNER) {
      if (food.foodTypes.includes(FoodType.SIDE))
        return "food-card-dinner-side";
      return "food-card-dinner";
    }
    if (mealType === MealType.LUNCH) {
      if (food.foodTypes.includes(FoodType.SIDE)) return "food-card-lunch-side";
      return "food-card-lunch";
    }
    if (mealType === MealType.BREAKFAST) {
      if (food.foodTypes.includes(FoodType.SIDE))
        return "food-card-breakfast-side";
      return "food-card-breakfast";
    }
    if (mealType === MealType.SWEET_TREAT) {
      return "food-card-sweet-treat";
    }
    return "food-card-snack";
  };

  return (
    <Card className="food-card" raised={false} sx={{ borderRadius: ".75rem" }}>
      {
        food.image &&
        <div className="food-card-image-container">
          <img className="food-image" src={food.image} alt="Food" />
        </div>
      }
      <div className={`food-card-indicator ${getFoodTypeClass()}`}></div>
      <div className="food-card-details-container">
        <h3 className="food-title">{food.title}</h3>
        <FoodFactArray food={food} />
      </div>
    </Card>
  );
};

export default FoodCard;
