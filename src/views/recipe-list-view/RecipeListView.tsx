import { useCallback, useEffect, useState } from "react";
import "./RecipeListView.css";
import { Recipe } from "../../models/Recipe";
import { getAllRecipes } from "../../services/recipeService";
import RecipeListDisplay from "../../components/recipe-list-display/RecipeListDisplay";
import { Card, IconButton, TextField } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import RecipeTypeChipSelector from "../../components/recipe-type-chip/recipe-type-chip-selector/RecipeTypeChipSelector";
import { RecipeType } from "../../models/RecipeType";
import CloseIcon from "@mui/icons-material/Close";

const RecipeListView = ({
  recipeSelected,
  dialogView,
  onClose,
  scrollRef,
}: {
  recipeSelected?: (recipe: Recipe) => void;
  dialogView?: boolean;
  onClose?: () => void;
  scrollRef?: React.MutableRefObject<any>;
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [recipeFilter, setRecipeFilter] = useState<string>("");
  const [selectedRecipeTypes, setSelectedRecipeTypes] = useState<RecipeType[]>([]);
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
      setRecipes(getAllRecipes());
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
        setRecipes((recipes) => [...recipes, ...getAllRecipes()]);
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
          <span className="recipe-list-view-recipe-type-selector-container">
            <RecipeTypeChipSelector chipsChanged={setSelectedRecipeTypes} />
          </span>
        </Card>
      </div>
      <RecipeListDisplay
        recipes={recipes
          .filter((recipe: Recipe) =>
            recipe.title
              .toLowerCase()
              .includes(debouncedRecipeFilter.toLowerCase())
          )
          .filter((recipe: Recipe) => {
            if (!selectedRecipeTypes.length) return true;
            for (let i = 0; i < selectedRecipeTypes.length; i++) {
              if (!recipe.recipeTypes.includes(selectedRecipeTypes[i])) return false;
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
