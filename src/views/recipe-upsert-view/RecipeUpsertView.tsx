import { useEffect, useState } from "react";
import RecipeUpsert from "../../components/recipe-upsert/RecipeUpsert";
import { Food } from "../../models/Food";
import "./RecipeUpsertView.css";
import { getFoodById, upsertFood } from "../../services/foodService";
import { useNavigate, useParams } from "react-router";
import RecipeDisplaySkeleton from "../../components/recipe-display/RecipeDisplaySkeleton";

const RecipeUpsertView = () => {
  const [food, setFood] = useState<Food>(new Food());
  const [loading, setLoading] = useState<boolean>(true);
  let { foodId } = useParams();
  const navigate = useNavigate();

  const handleFoodUpsert = (updatedFood: Food) => {
    setFood(upsertFood(updatedFood));
    navigate("/recipes/" + updatedFood.id);
  };

  useEffect(() => {
    if (foodId) {
      setTimeout(() => {
        foodId && setFood(getFoodById(+foodId));
        setLoading(false);
      }, 250);
    } else {
      setLoading(false);
    }
  }, [foodId]);

  return (
    <div className="max-page-content recipe-upsert-container">
      {!loading ? (
        <RecipeUpsert
          initialFood={food}
          onSubmit={handleFoodUpsert}
        ></RecipeUpsert>
      ) : (
        <RecipeDisplaySkeleton />
      )}
    </div>
  );
};

export default RecipeUpsertView;
