import { Card, Divider, IconButton } from '@mui/material';
import { Recipe } from '../../models/Recipe';
import RecipeTypeChip from '../recipe-type-chip/RecipeTypeChip';
import './RecipeDisplay.css';
import RecipeFactArray from '../recipe-card/recipe-fact-array/RecipeFactArray';
import { Link } from 'react-router';
import { Edit } from '@mui/icons-material';

const RecipeDisplay = ({ recipe }: { recipe: Recipe; }) => {
    return <Card className={recipe.steps.length ? "recipe-display" : "recipe-display-small"} raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        <div className="recipe-display-header-container">
            <div className={recipe.steps.length || recipe.image ? "recipe-display-title-container" : "recipe-display-title-container-no-image"}>
                <h2>{recipe.title}</h2>
                {recipe.recipeTypes.map((recipeType, index) => <RecipeTypeChip key={index} recipeType={recipeType} />)}
            </div>
            <div className="recipe-display-action-button-container">
                <Link to={`/recipes/edit/${recipe.id}`} className='no-link-style'>
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
                <RecipeFactArray recipe={recipe} />
                <h3>Ingredients</h3>
                {recipe.ingredients.map((ingredient, index) => <p className="ingredient-list-item" key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.grocery.name}</p>)}
            </div>
            {recipe.steps.length || recipe.image ?
                <>
                    <Divider variant="middle" orientation="vertical" flexItem />
                    <div className="recipe-display-directions-column">
                        {recipe.image ?
                            <img className={recipe.steps.length ? "recipe-display-image" : "recipe-display-image-small"} src={recipe.image} alt="completed recipe" /> :
                            <></>
                        }
                        {
                            recipe.steps.length ?
                                <>

                                    <div>
                                        <ul className="no-bullets"><li><h3>Directions</h3></li></ul>
                                        <ol>
                                            {recipe.steps.sort((a, b) => a.ordinal - b.ordinal).map((step, index) => <li key={index}>
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