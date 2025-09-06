import { useContext, useRef, useState } from "react";
import { Recipe } from "../../../models/Recipe";
import { MealType } from "../../../models/MealType";
import "./MealPlanColumnUpsert.css";
import RecipeCard from "../../recipe-card/RecipeCard";
import { Button, Dialog } from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import RecipeListView from "../../../views/recipe-list-view/RecipeListView";
import { MealRecipe } from "../../../models/MealRecipe";
import { Draggable } from "../../draggable/Draggable";
import { RecipeType } from "../../../models/RecipeType";
import { MealRecipeIdCounterContext } from "../MealPlanUpsert";

const MealPlanColumnUpsert = ({
  mealType,
  initialRecipes,
  mealPlanColumnChange,
  setMealRecipeIdCounter
}: {
  mealType: MealType;
  initialRecipes: MealRecipe[];
  mealPlanColumnChange: (mealRecipes: MealRecipe[]) => void;
  setMealRecipeIdCounter: (value: React.SetStateAction<number>) => void;
}) => {
  const [recipes, setRecipes] = useState<MealRecipe[]>(initialRecipes);
  const [open, setOpen] = useState(false);

  const mealRecipeIdCounter = useContext(MealRecipeIdCounterContext)

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
    const newRecipes = [...recipes, { ...mealRecipe, id: mealRecipeIdCounter }];
    setMealRecipeIdCounter(mealRecipeIdCounter - 1);
    setRecipes(newRecipes);
    mealPlanColumnChange(newRecipes);
  };

  return (
    <span className="meal-plan-column-edit">
      <h3 className="meal-plan-column-edit-title">{mealType}</h3>
      {recipes.sort(
        (a, b) => {
          if (a.recipe.recipeTypes.includes(RecipeType.SIDE)) { return 1 }
          else if (b.recipe.recipeTypes.includes(RecipeType.SIDE)) { return -1 }
          else return 0
        }
      ).map((mealRecipe: MealRecipe, index: number) => (
        <div className="meal-plan-recipe-card-container" key={mealRecipe.id}>
          <div className="meal-plan-recipe-card">
            <Draggable id={mealRecipe.id}>
              <RecipeCard
                recipe={mealRecipe.recipe}
                mealType={mealType}
                leftovers={mealRecipe.leftovers}
                iconButton={{ icon: <Delete />, onClick: () => { onDelete(index) }, tooltip: "Remove Recipe" }} />
            </Draggable>
          </div>
        </div>
      ))}
      {recipes.length === 0 ? (
        <div className="meal-plan-column-edit-empty">
          <i>No Recipes Yet</i>
        </div>
      ) : (
        <></>
      )}
      <Button
        variant="text"
        onClick={handleClickOpen}
        startIcon={<AddCircleOutline
          sx={{color: 'var(--button-positive-color)'}} />}
        sx={{ 
          justifyContent: 'flex-start',
          color: 'var(--button-positive-color)'
        }}
        fullWidth>
        Add Recipe
      </Button>
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

export default MealPlanColumnUpsert;
