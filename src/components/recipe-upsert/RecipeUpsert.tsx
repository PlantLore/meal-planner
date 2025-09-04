import {
  Button,
  Card,
  Divider,
  Fade,
  InputAdornment,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import "./RecipeUpsert.css";
import RecipeTypeChipSelector from "../recipe-type-chip/recipe-type-chip-selector/RecipeTypeChipSelector";
import { RecipeType } from "../../models/RecipeType";
import {
  FastfoodOutlined,
  LocalFireDepartmentOutlined,
} from "@mui/icons-material";
import IngredientListUpsert from "./ingredient-list-upsert/IngredientListUpsert";
import DirectionsListUpsert from "./directions-list-upsert/DirectionsListUpsert";
import { Recipe } from "../../models/Recipe";
import { Step } from "../../models/Step";
import { useState } from "react";
import { Ingredient } from "../../models/Ingredient";
import { validateFraction } from "../../utilities/FractionUtils";
import { useNavigate } from "react-router";

const RecipeUpsert = ({
  initialRecipe,
  onSubmit,
}: {
  initialRecipe: Recipe;
  onSubmit: (updatedRecipe: Recipe, archived?: boolean) => void;
}) => {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [blurFields, setBlurFields] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!validtate()) return;

    const newRecipe = { ...recipe, recipe: updateRecipeOrdinal(recipe.steps) };
    onSubmit(newRecipe);
  };

  const handleUnarchive = () => {
    setSubmitted(true);

    if (!validtate()) return;

    const newRecipe = { ...recipe, recipe: updateRecipeOrdinal(recipe.steps), archived: false };
    onSubmit(newRecipe);
  }

  const validtate = (): boolean => {
    //validate title
    if (!recipe.title) return false;

    //validate type
    if (!recipe.recipeTypes.length) return false;

    //validate calories
    if (recipe.calories < 0 || isNaN(recipe.calories)) return false;

    //validate servings
    if (recipe.servings < 1 || isNaN(recipe.servings)) return false;

    //validate ingredients
    if (!recipe.ingredients.length) return false;
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (
        !recipe.ingredients[i].grocery.name ||
        !validateFraction(recipe.ingredients[i].quantity)
      )
        return false;
    }

    //validate directions
    for (let i = 0; i < recipe.steps.length; i++) {
      if (!recipe.steps[i].text) return false;
    }

    return true;
  };

  const updateRecipeOrdinal = (recipe: Step[]): Step[] => {
    return recipe.map((step: Step, index: number) => {
      step.ordinal = index + 1;
      return step;
    });
  };

  const handleRecipeFieldChange = <K extends keyof Recipe>(
    value: Recipe[K],
    field: K
  ) => {
    const newRecipe = { ...recipe };
    newRecipe[field] = value;
    setRecipe(newRecipe);
  };

  const handleFieldBlur = (field: string) => {
    if (blurFields.includes(field)) return;
    setBlurFields([...blurFields, field]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card
        className="recipe-upsert-card"
        raised={false}
        sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}
      >
        <div className="recipe-upsert-card-title-container">
          <TextField
            size="small"
            fullWidth
            label="Recipe Name *"
            defaultValue={initialRecipe.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleRecipeFieldChange(event.target.value, "title");
            }}
            onBlur={() => {
              handleFieldBlur("title");
            }}
            error={(submitted || blurFields.includes("title")) && !recipe.title}
          />
          <div
            className={
              submitted && !recipe.recipeTypes.length
                ? "recipe-upsert-card-recipe-type-selector-container-error"
                : "recipe-upsert-card-recipe-type-selector-container"
            }
          >
            <RecipeTypeChipSelector
              initialChips={recipe.recipeTypes}
              chipsChanged={(recipeTypes: RecipeType[]) => {
                handleRecipeFieldChange(recipeTypes, "recipeTypes");
              }}
            />
          </div>
          {submitted && !recipe.recipeTypes.length ? (
            <p className="error-helper-text">
              Minimum One Recipe Type Required
            </p>
          ) : (
            <></>
          )}
        </div>

        <Divider variant="middle" />

        <div className="recipe-upsert-info-container">
          <div className="recipe-upsert-ingredient-column">
            <div className="recipe-upsert-recipe-fact-container">
              <TextField
                label="Calories *"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={
                          (submitted || blurFields.includes("calories")) &&
                            (recipe.calories < 0 || isNaN(recipe.calories))
                            ? { color: "rgb(211, 47, 47)" }
                            : {}
                        }
                      >
                        <LocalFireDepartmentOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
                size="small"
                sx={{ width: "8rem" }}
                defaultValue={initialRecipe.calories}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleRecipeFieldChange(
                    event.target.value ? +event.target.value : -1,
                    "calories"
                  );
                }}
                onBlur={() => {
                  handleFieldBlur("calories");
                }}
                error={
                  (submitted || blurFields.includes("calories")) &&
                  (recipe.calories < 0 || isNaN(recipe.calories))
                }
              />
              <TextField
                label="Servings *"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={
                          (submitted || blurFields.includes("servings")) &&
                            (recipe.servings < 1 || isNaN(recipe.servings))
                            ? { color: "rgb(211, 47, 47)" }
                            : {}
                        }
                      >
                        <FastfoodOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
                size="small"
                sx={{ width: "8rem" }}
                defaultValue={initialRecipe.servings}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleRecipeFieldChange(
                    event.target.value ? +event.target.value : -1,
                    "servings"
                  );
                }}
                onBlur={() => {
                  handleFieldBlur("servings");
                }}
                error={
                  (submitted || blurFields.includes("servings")) &&
                  (recipe.servings < 1 || isNaN(recipe.servings))
                }
              />
            </div>
            <h3>Ingredients</h3>
            {submitted && !recipe.ingredients.length ? (
              <p className="error-helper-text">
                Minimum One Ingredient Required
              </p>
            ) : (
              <></>
            )}
            <IngredientListUpsert
              submitted={submitted}
              initialIngredients={recipe.ingredients}
              onChange={(ingredients: Ingredient[]) => {
                handleRecipeFieldChange(ingredients, "ingredients");
              }}
            />
          </div>
          <Divider variant="middle" orientation="vertical" flexItem />
          <div className="recipe-upsert-directions-column">
            <div className="recipe-upsert-image-container">
              <TextField
                label="Image URL"
                size="small"
                fullWidth
                defaultValue={recipe.image}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleRecipeFieldChange(event.target.value, "image");
                }}
              />
            </div>
            <div>
              <ul className="no-bullets">
                <li>
                  <h3>Directions</h3>
                </li>
              </ul>
              <DirectionsListUpsert
                submitted={submitted}
                initialSteps={recipe.steps}
                onChange={(directions: Step[]) => {
                  handleRecipeFieldChange(directions, "steps");
                }}
              />
            </div>
          </div>
        </div>
      </Card>
      <div className="recipe-upsert-actions-container">
        {recipe.id > 0 ? recipe.archived ? 
        <Button
          color="primary"
          variant="contained"
          onClick={handleUnarchive}
          sx={{ margin: ".75rem .5rem" }}>
          Unarchive
        </Button> :
        <Button
          color="error"
          variant="contained"
          onClick={recipe.id > 0 ? handleOpen : () => {
              navigate(-1);
            }}
          sx={{ margin: ".75rem .5rem" }}>
          Archive
        </Button> :
        <div></div>}
        <div className="recipe-upsert-submit-container">
          <Button
            type="reset"
            color="error"
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open} timeout={250}>
          <div className="modal-recipe-delete-container">
            <Paper elevation={3} sx={{
              width: 'fit-content',
              maxWidth: '30vw',
              height: 'fit-content',
              backgroundColor: 'var(--card-color)',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '2px',
              padding: '1rem',
              gap: '1rem',
              fontSize: '1.2rem',
            }}>
              <div>Are you sure you want to archive this recipe?</div>
              <div>It will no longer be available for future meal plans.</div>
              <div className="recipe-upsert-delete-actions-container">
                <Button variant="contained" onClick={handleClose}>
                  No
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                    onSubmit(recipe, true);
                  }}
                >
                  Yes
                </Button>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </form>
  );
};

export default RecipeUpsert;
