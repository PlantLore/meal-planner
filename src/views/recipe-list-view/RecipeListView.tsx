import { useCallback, useEffect, useState } from "react";
import "./RecipeListView.css";
import { Food } from "../../models/Food";
import { getAllFoods } from "../../services/foodService";
import RecipeListDisplay from "../../components/recipe-list-display/RecipeListDisplay";
import { Card, IconButton, TextField } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import FoodTypeChipSelector from "../../components/food-type-chip/food-type-chip-selector/FoodTypeChipSelector";
import { FoodType } from "../../models/FoodType";
import CloseIcon from "@mui/icons-material/Close";

const RecipeListView = ({
  recipeSelected,
  dialogView,
  onClose,
  scrollRef,
}: {
  recipeSelected?: (food: Food) => void;
  dialogView?: boolean;
  onClose?: () => void;
  scrollRef?: React.MutableRefObject<any>;
}) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [recipeFilter, setRecipeFilter] = useState<string>("");
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<FoodType[]>([]);
  const debouncedRecipeFilter: string = useDebounce<string>(recipeFilter, 500);

  const handleScroll = useCallback(() => {
    if (
      !scrollRef &&
      document.body.scrollHeight - 300 < window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    } else if (
      scrollRef &&
      scrollRef?.current?.querySelector(".MuiPaper-root").scrollTop + 200 >
        scrollRef?.current?.querySelector(".MuiPaper-root").offsetHeight
    ) {
      setLoading(true);
    }
  }, [scrollRef]);

  useEffect(() => {
    let currentScrollRef: any;
    setTimeout(() => {
      setFoods(getAllFoods());
      setLoading(false);
      if (scrollRef) {
        scrollRef?.current
          ?.querySelector(".MuiPaper-root")
          .addEventListener?.("scroll", debounce(handleScroll, 250));
        currentScrollRef = scrollRef?.current?.querySelector(".MuiPaper-root");
      } else {
        window.addEventListener?.("scroll", debounce(handleScroll, 250));
      }
    }, 250);
    return () => {
      if (scrollRef) {
        currentScrollRef?.removeEventListener?.(
          "scroll",
          debounce(handleScroll, 250)
        );
      } else {
        window.removeEventListener?.("scroll", debounce(handleScroll, 250));
      }
    };
  }, [handleScroll, scrollRef]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setFoods((foods) => [...foods, ...getAllFoods()]);
        setLoading(false);
      }, 250);
    }
  }, [loading]);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: unknown[]) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return (
    <div
      className={
        dialogView ? "recipe-list-view-page-padding" : "max-page-content"
      }
    >
      <div className="recipe-list-view-header-container">
        <h1 className="recipe-list-view-title">Recipes</h1>
        <div className="recipe-list-view-action-button-container">
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={(theme) => ({
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="recipe-list-view-filter-container">
        <Card
          sx={{
            borderRadius: ".75rem",
            backgroundColor: "var(--card-color)",
            padding: "1rem",
          }}
        >
          <TextField
            label="Recipe"
            size="small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRecipeFilter(event.target.value);
            }}
          />
          <span className="recipe-list-view-food-type-selector-container">
            <FoodTypeChipSelector chipsChanged={setSelectedFoodTypes} />
          </span>
        </Card>
      </div>
      <RecipeListDisplay
        foods={foods
          .filter((food: Food) =>
            food.title
              .toLowerCase()
              .includes(debouncedRecipeFilter.toLowerCase())
          )
          .filter((food: Food) => {
            if (!selectedFoodTypes.length) return true;
            for (let i = 0; i < selectedFoodTypes.length; i++) {
              if (!food.foodTypes.includes(selectedFoodTypes[i])) return false;
            }
            return true;
          })}
        loading={loading}
        recipeSelected={recipeSelected}
      />
    </div>
  );
};

export default RecipeListView;
