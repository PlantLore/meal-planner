import { MealType } from "../../../models/MealType";
import RecipeCard from "../../recipe-card/RecipeCard";
import "./MealPlanColumn.css";
import { MealRecipe } from "../../../models/MealRecipe";

const MealPlanColumn = ({
  mealType,
  recipes,
}: {
  mealType: MealType;
  recipes: MealRecipe[];
}) => {
  return (
    <span className="meal-plan-column">
      <h3 className="meal-plan-column-title">{mealType}</h3>
      {recipes.map((mealRecipe: MealRecipe) => (
        <div className="meal-plan-recipe-card" key={mealRecipe.recipe.id}>
          <RecipeCard recipe={mealRecipe.recipe} mealType={mealType} leftovers={mealRecipe.leftovers} />
        </div>
      ))}
      {recipes.length === 0 ? (
        <div>
          <i>No Recipes in This Category</i>
        </div>
      ) : (
        <></>
      )}
    </span>
  );
};

export default MealPlanColumn;
