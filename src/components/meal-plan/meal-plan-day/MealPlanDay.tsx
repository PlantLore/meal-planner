import { Card, Divider, Grid2 } from "@mui/material";
import "./MealPlanDay.css";
import { FoodType } from "../../../models/FoodType";
import FoodCard from "../../food-card/FoodCard";

const MealPlanDay = () => {
  const food = {
    id: 0,
    title: "Spaghetti",
    recipie: "",
    servings: 4,
    calories: 600,
    foodTypes: [FoodType.DINNER],
    ingredient: [],
    image: "https://i.imgur.com/8ewJgNK.png",
  };

  return (
    <Card
      raised={false}
      sx={{
        borderRadius: ".25rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      <span className="meal-plan-day-column">
        Breakfast
        <FoodCard food={{ ...food, foodTypes: [FoodType.BREAKFAST] }} />
        <FoodCard
          food={{
            ...food,
            foodTypes: [FoodType.BREAKFAST, FoodType.SIDE, FoodType.FRUIT],
          }}
        />
      </span>
      <Divider orientation="vertical" flexItem></Divider>
      <span className="meal-plan-day-column">
        Lunch
        <FoodCard food={{ ...food, foodTypes: [FoodType.LUNCH] }} />
      </span>
      <Divider orientation="vertical" flexItem></Divider>
      <span className="meal-plan-day-column">
        Dinner
        <FoodCard food={{ ...food, foodTypes: [FoodType.DINNER] }} />
        <FoodCard
          food={{
            ...food,
            foodTypes: [FoodType.DINNER, FoodType.SIDE, FoodType.VEGETABLE],
          }}
        />
      </span>
      <Divider orientation="vertical" flexItem></Divider>
      <span className="meal-plan-day-column">
        Snacks
        <FoodCard food={{ ...food, foodTypes: [FoodType.SNACK] }} />
        <Divider></Divider>
        Sweet Treats
        <FoodCard food={{ ...food, foodTypes: [FoodType.SWEET_TREAT] }} />
      </span>
    </Card>
  );
};

export default MealPlanDay;
