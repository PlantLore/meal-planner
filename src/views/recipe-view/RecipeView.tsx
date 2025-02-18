import RecipeDisplay from '../../components/recipe-display/RecipeDisplay';
import { mockFoods } from '../../services/mockData';
import './RecipeView.css';

const RecipeView = () => {
    const food = mockFoods[0];

    return <div className='max-page-content recipe-display-container'>
        {/* <h1 className="recipe-view-title">Recipe</h1> */}
        <RecipeDisplay food={food}></RecipeDisplay>
    </div>;
};

export default RecipeView;