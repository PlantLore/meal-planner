import { useParams } from 'react-router';
import RecipeDisplay from '../../components/recipe-display/RecipeDisplay';
import './RecipeView.css';
import { useEffect, useState } from 'react';
import { Food } from '../../models/Food';
import { getFoodById } from '../../services/foodService';
import RecipeDisplaySkeleton from '../../components/recipe-display/RecipeDisplaySkeleton';

const RecipeView = () => {
    const [food, setFood] = useState<Food>();
    let { foodId } = useParams();

    useEffect(() => {
        setTimeout(() => {
            foodId && setFood(getFoodById(+foodId));
        }, 250);
    }, [foodId]);

    return <div className='max-page-content recipe-display-container'>
        {food ?
            <RecipeDisplay food={food} /> :
            <RecipeDisplaySkeleton />
        }
    </div>;
};

export default RecipeView;