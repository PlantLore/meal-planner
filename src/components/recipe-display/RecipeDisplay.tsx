import { Card, Divider, IconButton } from '@mui/material';
import { Food } from '../../models/Food';
import FoodTypeChip from '../food-type-chip/FoodTypeChip';
import './RecipeDisplay.css';
import FoodFactArray from '../food-card/food-fact-array/FoodFactArray';
import { Link } from 'react-router';
import { Edit } from '@mui/icons-material';

const RecipeDisplay = ({ food }: { food: Food; }) => {
    return <Card className={food.recipe.length ? "recipe-display" : "recipe-display-small"} raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        <div className="recipe-display-header-container">
            <div className={food.recipe.length || food.image ? "recipe-display-title-container" : "recipe-display-title-container-no-image"}>
                <h2>{food.title}</h2>
                {food.foodTypes.map((foodType, index) => <FoodTypeChip key={index} foodType={foodType} />)}
            </div>
            <div className="recipe-display-action-button-container">
                <Link to={`/recipes/edit/${food.id}`} className='no-link-style'>
                    <IconButton
                        sx={(theme) => ({
                            color: theme.palette.grey[500],
                        })}
                    >
                        <Edit />
                    </IconButton>
                </Link>
            </div>
        </div>

        <Divider variant="middle" />

        <div className="recipe-display-info-container">
            <div className="recipe-display-ingredient-column">
                <FoodFactArray food={food} />
                <h3>Ingredients</h3>
                {food.ingredients.map((ingredient, index) => <p className="ingredient-list-item" key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>)}
            </div>
            {food.recipe.length || food.image ?
                <>
                    <Divider variant="middle" orientation="vertical" flexItem />
                    <div className="recipe-display-directions-column">
                        {food.image ?
                            <img className={food.recipe.length ? "recipe-display-image" : "recipe-display-image-small"} src={food.image} alt="completed recipe" /> :
                            <></>
                        }
                        {
                            food.recipe.length ?
                                <>

                                    <div>
                                        <ul className="no-bullets"><li><h3>Directions</h3></li></ul>
                                        <ol>
                                            {food.recipe.sort((a, b) => a.ordinal - b.ordinal).map((step, index) => <li key={index}>
                                                {step.text}
                                            </li>)}
                                        </ol>
                                    </div>
                                </> :
                                <></>
                        }
                    </div>
                </> :
                <></>}

        </div>
    </Card>;;
};

export default RecipeDisplay;