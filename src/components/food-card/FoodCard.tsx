import "./FoodCard.css";
import { Card, Tooltip } from "@mui/material";
import {
  FastfoodOutlined,
  Favorite,
  FavoriteBorder,
  LocalFireDepartmentOutlined,
} from "@mui/icons-material";
import { Food } from "../../models/Food";
import FoodFact from "./food-fact/FoodFact";
import { FoodType } from "../../models/FoodType";

const FoodCard = ({ food }: { food: Food }) => {
  const getFoodTypeClass = (): string => {
    if (food.foodTypes.includes(FoodType.DINNER)) {
      if (food.foodTypes.includes(FoodType.SIDE))
        return "food-card-dinner-side";
      return "food-card-dinner";
    }
    if (food.foodTypes.includes(FoodType.LUNCH)) {
      if (food.foodTypes.includes(FoodType.SIDE)) return "food-card-lunch-side";
      return "food-card-lunch";
    }
    if (food.foodTypes.includes(FoodType.BREAKFAST)) {
      if (food.foodTypes.includes(FoodType.SIDE))
        return "food-card-breakfast-side";
      return "food-card-breakfast";
    }
    if (food.foodTypes.includes(FoodType.SWEET_TREAT)) {
      return "food-card-sweet-treat";
    }
    return "food-card-snack";
  };

  return (
    <Card className="food-card" raised={false} sx={{ borderRadius: ".75rem" }}>
      <span className="food-card-image-container">
        <img className="food-image" src={food.image} alt="Food" />
      </span>
      <span className={`food-card-indicator ${getFoodTypeClass()}`}></span>
      <span className="food-card-details-container">
        <div className="food-title">{food.title}</div>
        <FoodFact
          tooltip={"Calories"}
          icon={<LocalFireDepartmentOutlined />}
          value={food.calories}
        />
        <FoodFact
          tooltip={"Servings"}
          icon={<FastfoodOutlined />}
          value={food.servings}
        />
        {food.foodTypes.includes(FoodType.FRUIT) ? (
          <FoodFact tooltip={"Fruit"} icon={<Favorite />} />
        ) : null}
        {food.foodTypes.includes(FoodType.VEGETABLE) ? (
          <FoodFact tooltip={"Vegetable"} icon={<FavoriteBorder />} />
        ) : null}
      </span>
    </Card>
  );
};

export default FoodCard;
