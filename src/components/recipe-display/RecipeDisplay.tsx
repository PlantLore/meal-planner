import { Card, Divider } from '@mui/material';
import { Food } from '../../models/Food';
import FoodTypeChip from '../recipe-card/food-type-chip/FoodTypeChip';
import './RecipeDisplay.css';
import FoodFactArray from '../food-card/food-fact-array/FoodFactArray';

const RecipeDisplay = ({ food }: { food: Food; }) => {
    return <Card className="recipe-display" raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        <div className={((): string => food.image ? "recipe-display-title-container" : "recipe-display-title-container-no-image")()}>
            <h2>{food.title}</h2>
            {food.foodTypes.map((foodType, index) => <FoodTypeChip key={index} foodType={foodType} />)}
        </div>

        <Divider variant="middle" />

        <div className="recipe-display-info-container">
            <div className="recipe-display-ingredient-column">
                <FoodFactArray food={food} />
                <h3>Ingredients</h3>
                {food.ingredients.map((ingredient, index) => <p className="ingredient-list-item" key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>)}
            </div>
            <Divider variant="middle" orientation="vertical" flexItem />
            <div className="recipe-display-directions-column">
                {food.image ?
                    <img className="recipe-display-image" src={food.image} alt="completed recipe" /> :
                    <Divider variant="middle" />
                }
                {
                    food.recipe.length ?
                        <>

                            <div>
                                <ul className="no-bullets"><li><h3>Directions</h3></li></ul>
                                <ol>
                                    {food.recipe.map((step, index) => <li key={index}>
                                        {step.text}
                                        <ul>
                                            {step.ingredients?.map((ingredient, index) => <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>)}
                                        </ul>
                                    </li>)}
                                </ol>
                            </div>
                        </> :
                        <></>
                }
            </div>

        </div>
    </Card>;;
};

export default RecipeDisplay;