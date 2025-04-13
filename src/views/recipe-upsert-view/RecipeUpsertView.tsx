import { useEffect, useState } from "react";
import RecipeUpsert from "../../components/recipe-upsert/RecipeUpsert";
import { Recipe } from "../../models/Recipe";
import "./RecipeUpsertView.css";
import { getRecipeById, upsertRecipe } from "../../services/recipeService";
import { useNavigate, useParams } from "react-router";
import RecipeDisplaySkeleton from "../../components/recipe-display/RecipeDisplaySkeleton";

const RecipeUpsertView = () => {
  const [recipe, setRecipe] = useState<Recipe>(new Recipe());
  const [loading, setLoading] = useState<boolean>(true);
  let { recipeId } = useParams();
  const navigate = useNavigate();

  const handleRecipeUpsert = (updatedRecipe: Recipe) => {
    setRecipe(upsertRecipe(updatedRecipe));
    navigate("/recipes/" + updatedRecipe.id);
  };

  useEffect(() => {
    if (recipeId) {
      setTimeout(() => {
        recipeId && setRecipe(getRecipeById(+recipeId));
        setLoading(false);
      }, 250);
    } else {
      setLoading(false);
    }
  }, [recipeId]);

  return (
    <div className="max-page-content recipe-upsert-container">
      {!loading ? (
        <RecipeUpsert
          initialRecipe={recipe}
          onSubmit={handleRecipeUpsert}
        ></RecipeUpsert>
      ) : (
        <RecipeDisplaySkeleton />
      )}
    </div>
  );
};

export default RecipeUpsertView;
