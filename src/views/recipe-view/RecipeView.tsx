import { useLocation, useNavigate, useParams } from 'react-router';
import RecipeDisplay from '../../components/recipe-display/RecipeDisplay';
import './RecipeView.css';
import { useEffect, useState } from 'react';
import { Recipe } from '../../models/Recipe';
import { getRecipeById, getUpdatedRecipeByRecipeId } from '../../services/recipeService';
import RecipeDisplaySkeleton from '../../components/recipe-display/RecipeDisplaySkeleton';

const RecipeView = () => {
    const [recipe, setRecipe] = useState<Recipe>();
    const [init, setInit] = useState(false);
    let { recipeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (init) return;
        setInit(true);
        setTimeout(() => {
            if (recipeId) {
                if (location.pathname.includes("updated")) {
                    const updatedRecipe = getUpdatedRecipeByRecipeId(+recipeId)
                    navigate(`/recipes/${updatedRecipe.id}`, { replace: true });
                    setRecipe(updatedRecipe);
                } else {
                    setRecipe(getRecipeById(+recipeId));
                }
            }
        }, 250);
    }, [recipeId, init, location, navigate]);

    return <div className='max-page-content recipe-display-container'>
        {recipe ?
            <RecipeDisplay recipe={recipe} /> :
            <RecipeDisplaySkeleton />
        }
    </div>;
};

export default RecipeView;