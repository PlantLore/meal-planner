import React from 'react';
import './RecipeListView.css';
import { Food } from '../../models/Food';
import { getAllFoods } from '../../services/foodService';
import RecipeListDisplay from '../../components/recipe-list-display/RecipeListDisplay';

const RecipeListView = () => {
    const [foods, setFoods] = React.useState<Food[]>();

    React.useEffect(() => {
        setTimeout(() => {
            setFoods(getAllFoods());
        }, 250);
    });
    return <div className='max-page-content'>
        <h1 className='recipe-list-view-title'>Recipes</h1>
        <RecipeListDisplay foods={foods || []} />
    </div>;
};

export default RecipeListView;