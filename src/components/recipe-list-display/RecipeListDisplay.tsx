import { Food } from "../../models/Food";
import "./RecipeListDisplay.css";
import FoodCard from "../food-card/FoodCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useMemo } from "react";
import { IconButton, Skeleton, Tooltip } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

const RecipeListDisplay = ({
  foods,
  loading,
  recipeSelected,
}: {
  foods: Food[];
  loading?: boolean;
  recipeSelected?: (food: Food) => void;
}) => {
  const ROOT_FONT_SIZE: number = +window
    .getComputedStyle(document.body)
    .getPropertyValue("font-size")
    .substring(
      0,
      window.getComputedStyle(document.body).getPropertyValue("font-size")
        .length - 2
    );
  const breakpoints: { [key: number]: number } = useMemo(() => {
    const tempBreakpoints: { [key: number]: number } = {};
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
      <div className="recipe-list-display-food-card-column-container">
        {foods.length || loading ? (
          <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
            <Masonry containerTag="masonry-container-tag">
              {foods.map((food: Food, index: number) => (
                <div
                  key={index}
                  className="recipe-list-display-food-card-container"
                >
                  <div className="recipe-list-display-food-card">
                    <FoodCard food={food} />
                  </div>
                  {recipeSelected ? (
                    <div className="recipe-list-display-select-recipe-button">
                      <Tooltip title="Select Recipe">
                        <IconButton
                          onClick={() => {
                            recipeSelected(food);
                          }}
                        >
                          <CheckCircleOutline color="primary" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              {loading ? (
                new Array(20).fill("").map((value: string, index: number) => (
                  <div
                    key={index}
                    className="recipe-list-display-food-card-container"
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
