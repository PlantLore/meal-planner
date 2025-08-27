import "./RecipeCard.css";
import { Card, Dialog, IconButton, Tooltip } from "@mui/material";
import { Recipe } from "../../models/Recipe";
import { RecipeType } from "../../models/RecipeType";
import { MealType } from "../../models/MealType";
import RecipeFactArray from "./recipe-fact-array/RecipeFactArray";
import ExpandedRecipeCard from '../expanded-recipe-card/ExpandedRecipeCard';
import RecipeTypeChip from '../recipe-type-chip/RecipeTypeChip';
import { ReactElement, useState } from "react";
import { OpenInFull } from "@mui/icons-material";

const RecipeCard = (
  {
    recipe,
    mealType,
    leftovers,
    iconButton,
    selectOnClick
  }:
    {
      recipe: Recipe,
      mealType?: MealType,
      leftovers?: boolean,
      iconButton?: {icon: ReactElement, onClick: (recipe: Recipe) => void, tooltip?: string},
      selectOnClick?: (recipe: Recipe) => void
    }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const getRecipeTypeClass = (): string => {
    if (mealType === MealType.DINNER) {
      if (recipe.recipeTypes.includes(RecipeType.SIDE))
        return "recipe-card-dinner-side";
      return "recipe-card-dinner";
    }
    if (mealType === MealType.LUNCH) {
      if (recipe.recipeTypes.includes(RecipeType.SIDE)) return "recipe-card-lunch-side";
      return "recipe-card-lunch";
    }
    if (mealType === MealType.BREAKFAST) {
      if (recipe.recipeTypes.includes(RecipeType.SIDE))
        return "recipe-card-breakfast-side";
      return "recipe-card-breakfast";
    }
    if (mealType === MealType.SWEET_TREAT) {
      return "recipe-card-sweet-treat";
    }
    return "recipe-card-snack";
  };

  return (
    <>
      <Card
        onClick={selectOnClick ? () => selectOnClick(recipe) : handleClickOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="recipe-card"
        raised={false}
        sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        {
          recipe.image &&
          <div className="recipe-card-image-container">
            <img className="recipe-image" src={recipe.image} alt="Completed Recipe" />
          </div>
        }
        {mealType ? <div className={`recipe-card-indicator ${getRecipeTypeClass()}`}></div> : <></>}
        <div className="recipe-card-details-container">
          <h3 className="recipe-title"><span className="recipe-title-leftovers">{recipe.archived ? "(Archived) " : ""}{leftovers ? "Leftover " : ""}</span>{recipe.title}</h3>
          <RecipeFactArray recipe={recipe} />
        </div>
        <div className="recipe-card-type-chip-container">
          {!mealType ? recipe.recipeTypes.map((recipeType, index) => <RecipeTypeChip key={index} recipeType={recipeType} />) : <></>}
        </div>
        {iconButton && isHovered && !selectOnClick &&
          <div className="recipe-card-select-recipe-button">
            <Tooltip title={iconButton.tooltip}>
              <IconButton
                sx={{ backgroundColor: "var(--card-color)", '&:hover': { backgroundColor: "var(--card-color-hover)" } }}
                onClick={(event) => {
                  event.stopPropagation();
                  iconButton.onClick(recipe);
                }}
              >
                {iconButton.icon}
              </IconButton>
            </Tooltip>
          </div>
        }
        {selectOnClick && isHovered &&
          <div className="recipe-card-select-recipe-button">
            <Tooltip title="Expand Recipe">
              <IconButton
                sx={{ backgroundColor: "var(--card-color)", '&:hover': { backgroundColor: "var(--card-color-hover)" } }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleClickOpen();
                }}
              >
                <OpenInFull />
              </IconButton>
            </Tooltip>
          </div>
        }
      </Card>
      <Dialog onClose={handleClose} open={open} PaperProps={{ sx: { maxWidth: '100%', maxHeight: '100%', borderRadius: ".75rem" } }}>
        <ExpandedRecipeCard recipe={recipe} handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default RecipeCard;
