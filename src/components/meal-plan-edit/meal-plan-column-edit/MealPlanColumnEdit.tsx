import { useRef, useState } from "react";
import { Recipe } from "../../../models/Recipe";
import { MealType } from "../../../models/MealType";
import "./MealPlanColumnEdit.css";
import RecipeCard from "../../recipe-card/RecipeCard";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import RecipeListView from "../../../views/recipe-list-view/RecipeListView";

const MealPlanColumnEdit = ({
  mealType,
  initialRecipes,
  mealPlanColumnChange,
}: {
  mealType: MealType;
  initialRecipes: Recipe[];
  mealPlanColumnChange: (recipes: Recipe[]) => void;
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
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

  const recipeSelected = (recipe: Recipe): void => {
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
    mealPlanColumnChange(newRecipes);
  };

  return (
    <span className="meal-plan-column-edit">
      <h3 className="meal-plan-column-edit-title">{mealType}</h3>
      {recipes.map((recipe: Recipe, index: number) => (
        <div className="meal-plan-recipe-card-container" key={recipe.id}>
          <div className="meal-plan-recipe-card">
            <RecipeCard recipe={recipe} mealType={mealType} />
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
            recipeSelected(recipe);
            handleClose();
          }}
        />
      </Dialog>
    </span>
  );
};

export default MealPlanColumnEdit;
