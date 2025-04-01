import { useRef, useState } from "react";
import { Food } from "../../../models/Food";
import { MealType } from "../../../models/MealType";
import "./MealPlanColumnEdit.css";
import FoodCard from "../../food-card/FoodCard";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import RecipeListView from "../../../views/recipe-list-view/RecipeListView";

const MealPlanColumnEdit = ({
  mealType,
  initialFoods,
  mealPlanColumnChange,
}: {
  mealType: MealType;
  initialFoods: Food[];
  mealPlanColumnChange: (foods: Food[]) => void;
}) => {
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const [open, setOpen] = useState(false);

  const scrollableElementRef = useRef(null);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const onDelete = (index: number) => {
    const newFoods = [...foods];
    newFoods.splice(index, 1);
    setFoods(newFoods);
    mealPlanColumnChange(newFoods);
  };

  const recipeSelected = (food: Food): void => {
    const newFoods = [...foods, food];
    setFoods(newFoods);
    mealPlanColumnChange(newFoods);
  };

  return (
    <span className="meal-plan-column-edit">
      <h3 className="meal-plan-column-edit-title">{mealType}</h3>
      {foods.map((food: Food, index: number) => (
        <div className="meal-plan-food-card-container" key={food.id}>
          <div className="meal-plan-food-card">
            <FoodCard food={food} mealType={mealType} />
          </div>
          <div className="meal-plan-food-card-actions">
            <IconButton
              onClick={() => {
                onDelete(index);
              }}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
      ))}
      {foods.length === 0 ? (
        <div>
          <i>No Foods Yet</i>
        </div>
      ) : (
        <></>
      )}
      <Tooltip title="Add Recipe">
        <IconButton onClick={handleClickOpen}>
          <AddCircleOutline color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        maxWidth={"xl"}
        PaperProps={{
          sx: { borderRadius: ".75rem", backgroundColor: "var(--paper-color)" },
        }}
        ref={scrollableElementRef}
      >
        <RecipeListView
          dialogView
          onClose={handleClose}
          scrollRef={scrollableElementRef}
          recipeSelected={(food: Food) => {
            recipeSelected(food);
            handleClose();
          }}
        />
      </Dialog>
    </span>
  );
};

export default MealPlanColumnEdit;
