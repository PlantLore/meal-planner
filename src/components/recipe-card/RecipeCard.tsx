import { Card, Divider, IconButton } from "@mui/material";
import { Food } from "../../models/Food";
import "./RecipeCard.css";
import CloseIcon from '@mui/icons-material/Close';
import FoodTypeChip from "./food-type-chip/FoodTypeChip";
import FoodFactArray from "../food-card/food-fact-array/FoodFactArray";

const RecipeCard = ({ food, handleClose }: { food: Food; handleClose?: () => void; }) => {
    return <Card className="recipe-card" raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        <div className={((): string => food.image ? "recipe-card-title-container" : "recipe-card-title-container-no-image")()}>
            <h2>{food.title}</h2>
            {food.foodTypes.map((foodType, index) => <FoodTypeChip key={index} foodType={foodType} />)}
        </div>
        {
            handleClose ?
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton> :
                <></>
        }
        {food.image ?
            <img className="recipe-card-image" src={food.image} alt="completed recipe" /> :
            <Divider variant="middle" />
        }
        <div className="recipe-card-info-container">
            <div className="recipe-card-ingredient-column">
                <FoodFactArray food={food} />
                <h3>Ingredients</h3>
                {food.ingredients.map((ingredient, index) => <p className="ingredient-list-item" key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>)}
            </div>
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
        </div>
    </Card>;
};

export default RecipeCard;