import { useEffect, useState } from "react";
import RecipeUpsert from "../../components/recipe-upsert/RecipeUpsert";
import { Recipe } from "../../models/Recipe";
import "./RecipeUpsertView.css";
import { deleteRecipe, getRecipeById, upsertRecipe } from "../../services/recipeService";
import { useBlocker, useNavigate, useParams } from "react-router";
import RecipeDisplaySkeleton from "../../components/recipe-display/RecipeDisplaySkeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { set } from "../../reduxSlices/groceriesSlice";
import { getAllGroceries } from "../../services/groceryService";
import { Button, Fade, Modal, Paper } from "@mui/material";

const RecipeUpsertView = () => {
  const [recipe, setRecipe] = useState<Recipe>(new Recipe());
  const [loading, setLoading] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);
  const groceries = useSelector((state: RootState) => state.groceries.groceries);
  const dispatch = useDispatch();
  let { recipeId } = useParams();
  const navigate = useNavigate();

  useBlocker(({ nextLocation }) => {
    if (!saved) {
      setNavigationTarget(nextLocation.pathname);
      setShowNavigationWarning(true);
      return true;
    }
    return false;
  })

  const handleRecipeUpsert = (updatedRecipe: Recipe, deleted?: boolean) => {
    if (deleted) {
      deleteRecipe(updatedRecipe.id);
      setSaved(true);
      setTimeout(() => {
        navigate("/recipes");
      })
      return;
    }
    setRecipe(upsertRecipe(updatedRecipe));
    setSaved(true);
    setTimeout(() => {
      navigate("/recipes/" + updatedRecipe.id);
    })
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
      <Modal
        open={showNavigationWarning}
        onClose={() => setShowNavigationWarning(false)}>
        <Fade in={showNavigationWarning} timeout={250}>
          <div className="modal-navigation-warning-container">
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
              <div>Are you sure you want to leave? Any unsaved changes will be lost.</div>
              <div className="navigation-warning-actions-container">
                <Button variant="contained" onClick={() => setShowNavigationWarning(false)}>
                  No
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setShowNavigationWarning(false)
                    setSaved(true);
                    setTimeout(() => {
                      if (navigationTarget != null) navigate(navigationTarget);
                    })
                  }}
                >
                  Yes
                </Button>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default RecipeUpsertView;
