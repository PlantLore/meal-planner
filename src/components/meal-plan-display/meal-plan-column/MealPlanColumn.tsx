import { Recipe } from "../../../models/Recipe";
import { MealType } from "../../../models/MealType";
import RecipeCard from "../../recipe-card/RecipeCard";
import "./MealPlanColumn.css";

const MealPlanColumn = ({
  mealType,
  recipes,
}: {
  mealType: MealType;
  recipes: Recipe[];
}) => {
  return (
    <span className="meal-plan-column">
      <h3 className="meal-plan-column-title">{mealType}</h3>
      {recipes.map((recipe: Recipe) => (
        <div className="meal-plan-recipe-card" key={recipe.id}>
          <RecipeCard recipe={recipe} mealType={mealType} />
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
