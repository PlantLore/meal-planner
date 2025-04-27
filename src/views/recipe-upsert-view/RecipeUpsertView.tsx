import { useEffect, useState } from "react";
import RecipeUpsert from "../../components/recipe-upsert/RecipeUpsert";
import { Recipe } from "../../models/Recipe";
import "./RecipeUpsertView.css";
import { getRecipeById, upsertRecipe } from "../../services/recipeService";
import { useNavigate, useParams } from "react-router";
import RecipeDisplaySkeleton from "../../components/recipe-display/RecipeDisplaySkeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { set } from "../../reduxSlices/groceriesSlice";
import { getAllGroceries } from "../../services/groceryService";

const RecipeUpsertView = () => {
  const [recipe, setRecipe] = useState<Recipe>(new Recipe());
  const [loading, setLoading] = useState<boolean>(true);
  const groceries = useSelector((state: RootState) => state.groceries.groceries);
  const dispatch = useDispatch();
  let { recipeId } = useParams();
  const navigate = useNavigate();

  const handleRecipeUpsert = (updatedRecipe: Recipe) => {
    setRecipe(upsertRecipe(updatedRecipe));
    navigate("/recipes/" + updatedRecipe.id);
  };

  useEffect(() => {
    if (groceries.length === 0) dispatch(set(getAllGroceries()));
    if (recipeId) {
      setTimeout(() => {
        recipeId && setRecipe(getRecipeById(+recipeId));
        setLoading(false);
      }, 250);
    } else {
      setLoading(false);
    }
  }, [recipeId, groceries, dispatch]);

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
