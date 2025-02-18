import { useParams } from 'react-router';
import RecipeDisplay from '../../components/recipe-display/RecipeDisplay';
import './RecipeView.css';
import React from 'react';
import { Food } from '../../models/Food';
import { getFoodById } from '../../services/foodService';

const RecipeView = () => {
    const [food, setFood] = React.useState<Food>();
    let { foodId } = useParams();

    React.useEffect(() => {
        setTimeout(() => {
            foodId ?
                setFood(getFoodById(+foodId)) :
                setFood(getFoodById(1));
        }, 250);
    }, [foodId]);

    return <div className='max-page-content recipe-display-container'>
        {food ?
            <RecipeDisplay food={food} /> :
            <></>
        }
    </div>;
};

export default RecipeView;