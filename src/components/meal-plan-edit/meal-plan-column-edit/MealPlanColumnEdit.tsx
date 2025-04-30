import { useRef, useState } from "react";
import { Recipe } from "../../../models/Recipe";
import { MealType } from "../../../models/MealType";
import "./MealPlanColumnEdit.css";
import RecipeCard from "../../recipe-card/RecipeCard";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import RecipeListView from "../../../views/recipe-list-view/RecipeListView";
import { MealRecipe } from "../../../models/MealRecipe";

const MealPlanColumnEdit = ({
  mealType,
  initialRecipes,
  mealPlanColumnChange,
}: {
  mealType: MealType;
  initialRecipes: MealRecipe[];
  mealPlanColumnChange: (mealRecipes: MealRecipe[]) => void;
}) => {
  const [recipes, setRecipes] = useState<MealRecipe[]>(initialRecipes);
  const [open, setOpen] = useState(false);

  const scrollableElementRef = useRef(null);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const onDelete = (index: number) => {
    const newRecipes = [...recipes];
    newRecipes.splice(index, 1);
    setRecipes(newRecipes);
    mealPlanColumnChange(newRecipes);
  };

  const recipeSelected = (mealRecipe: MealRecipe): void => {
    const newRecipes = [...recipes, mealRecipe];
    setRecipes(newRecipes);
    mealPlanColumnChange(newRecipes);
  };

  return (
    <span className="meal-plan-column-edit">
      <h3 className="meal-plan-column-edit-title">{mealType}</h3>
      {recipes.map((mealRecipe: MealRecipe, index: number) => (
        <div className="meal-plan-recipe-card-container" key={mealRecipe.recipe.id}>
          <div className="meal-plan-recipe-card">
            <RecipeCard recipe={mealRecipe.recipe} mealType={mealType} leftovers={mealRecipe.leftovers} />
          </div>
          <div className="meal-plan-recipe-card-actions">
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
      {recipes.length === 0 ? (
        <div>
          <i>No Recipes Yet</i>
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
          recipeSelected={(recipe: Recipe) => {
            recipeSelected({ id: 0, leftovers: false, recipe: recipe });
            handleClose();
          }}
        />
      </Dialog>
    </span>
  );
};

export default MealPlanColumnEdit;
