import "./FoodCard.css";
import { Card, Dialog } from "@mui/material";
import { Food } from "../../models/Food";
import { FoodType } from "../../models/FoodType";
import { MealType } from "../../models/MealType";
import FoodFactArray from "./food-fact-array/FoodFactArray";
import RecipeCard from '../recipe-card/RecipeCard';
import FoodTypeChip from '../food-type-chip/FoodTypeChip';
import { useState } from "react";

const FoodCard = ({ food, mealType }: { food: Food, mealType?: MealType; }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

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
    <>
      <Card onClick={handleClickOpen} className="food-card" raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        {
          food.image &&
          <div className="food-card-image-container">
            <img className="food-image" src={food.image} alt="Food" />
          </div>
        }
        {mealType ? <div className={`food-card-indicator ${getFoodTypeClass()}`}></div> : <></>}
        <div className="food-card-details-container">
          <h3 className="food-title">{food.title}</h3>
          <FoodFactArray food={food} />
        </div>
        <div className="food-card-type-chip-container">
          {!mealType ? food.foodTypes.map((foodType, index) => <FoodTypeChip key={index} foodType={foodType} />) : <></>}
        </div>
      </Card>
      <Dialog onClose={handleClose} open={open} PaperProps={{ sx: { maxWidth: '100%', maxHeight: '100%', borderRadius: ".75rem" } }}>
        <RecipeCard food={food} handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default FoodCard;
