import { Recipe } from "../../models/Recipe";
import "./RecipeListDisplay.css";
import RecipeCard from "../recipe-card/RecipeCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useMemo } from "react";
import { Skeleton } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

const RecipeListDisplay = ({
  recipes,
  loading,
  recipeSelected,
}: {
  recipes: Recipe[];
  loading?: boolean;
  recipeSelected?: (recipe: Recipe) => void;
}) => {
  const ROOT_FONT_SIZE: number = +window
    .getComputedStyle(document.body)
    .getPropertyValue("font-size")
    .substring(
      0,
      window.getComputedStyle(document.body).getPropertyValue("font-size")
        .length - 2
    );
  const breakpoints: { [key: number]: number; } = useMemo(() => {
    const tempBreakpoints: { [key: number]: number; } = {};
    const fourBP = ROOT_FONT_SIZE * 72;
    const threeBP = ROOT_FONT_SIZE * 55;
    const twoBP = ROOT_FONT_SIZE * 38;
    const oneBP = 0;

    tempBreakpoints[fourBP] = 4;
    tempBreakpoints[threeBP] = 3;
    tempBreakpoints[twoBP] = 2;
    tempBreakpoints[oneBP] = 1;
    return tempBreakpoints;
  }, [ROOT_FONT_SIZE]);

  return (
    <div className="recipe-list-display-container">
      <div className="recipe-list-display-recipe-card-column-container">
        {recipes.length || loading ? (
          <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
            <Masonry containerTag="masonry-container-tag">
              {recipes.map((recipe: Recipe, index: number) => (
                <div
                  key={index}
                  className="recipe-list-display-recipe-card-container"
                >
                  <RecipeCard 
                    recipe={recipe} 
                    iconButton={recipeSelected && 
                      {icon: <CheckCircleOutline color="primary" />, onClick: recipeSelected, tooltip: "Select Recipe"}}
                    selectOnClick={recipeSelected} />
                </div>
              ))}
              {loading ? (
                new Array(20).fill("").map((value: string, index: number) => (
                  <div
                    key={index}
                    className="recipe-list-display-recipe-card-container"
                  >
                    <Skeleton
                      variant="rounded"
                      sx={{
                        maxWidth: "25rem",
                        minWidth: "15rem",
                        height: "14.25rem",
                      }}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <i>No Recipes to Display</i>
        )}
      </div>
    </div>
  );
};

export default RecipeListDisplay;
