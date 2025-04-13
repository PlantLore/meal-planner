import { useParams } from 'react-router';
import RecipeDisplay from '../../components/recipe-display/RecipeDisplay';
import './RecipeView.css';
import { useEffect, useState } from 'react';
import { Recipe } from '../../models/Recipe';
import { getRecipeById } from '../../services/recipeService';
import RecipeDisplaySkeleton from '../../components/recipe-display/RecipeDisplaySkeleton';

const RecipeView = () => {
    const [recipe, setRecipe] = useState<Recipe>();
    let { recipeId } = useParams();

    useEffect(() => {
        setTimeout(() => {
            recipeId && setRecipe(getRecipeById(+recipeId));
        }, 250);
    }, [recipeId]);

    return <div className='max-page-content recipe-display-container'>
        {recipe ?
            <RecipeDisplay recipe={recipe} /> :
            <RecipeDisplaySkeleton />
        }
    </div>;
};

export default RecipeView;