import { Card, Divider, IconButton } from "@mui/material";
import { Food } from "../../models/Food";
import "./RecipeCard.css";
import CloseIcon from '@mui/icons-material/Close';
import FoodTypeChip from "../food-type-chip/FoodTypeChip";
import FoodFactArray from "../food-card/food-fact-array/FoodFactArray";
import { OpenInFull } from "@mui/icons-material";
import { Link } from "react-router";

const RecipeCard = ({ food, handleClose }: { food: Food; handleClose?: () => void; }) => {
    return <Card className={((): string => food.recipe.length ? "recipe-card" : "recipe-card-small")()} raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        <div className="recipe-card-header-container">
            <div className={((): string => food.image ? "recipe-card-title-container" : "recipe-card-title-container-no-image")()}>
                <h2>{food.title}</h2>
                {food.foodTypes.map((foodType, index) => <FoodTypeChip key={index} foodType={foodType} />)}
            </div>
            <div className="recipe-card-action-button-container">
                <Link to={`/recipe/${food.id}`} className='no-link-style'>
                    <IconButton
                        sx={(theme) => ({
                            color: theme.palette.grey[500],
                        })}
                    >
                        <OpenInFull />
                    </IconButton>
                </Link>
                {
                    handleClose ?
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={(theme) => ({
                                color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon />
                        </IconButton> :
                        <></>
                }
            </div>
        </div>
        {food.image ?
            <img className={((): string => food.recipe.length ? "recipe-card-image" : "recipe-card-image-small")()} src={food.image} alt="completed recipe" /> :
            <Divider variant="middle" />
        }
        <div className="recipe-card-info-container">
            <div className="recipe-card-ingredient-column">
                <FoodFactArray food={food} />
                <h3>Ingredients</h3>
                {food.ingredients.map((ingredient, index) => <p className="ingredient-list-item" key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>)}
            </div>
            {
                food.recipe.length ?
                    <>
                        <Divider variant="middle" orientation="vertical" flexItem />
                        <div className="recipe-card-directions-column">
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
    </Card>;
};

export default RecipeCard;