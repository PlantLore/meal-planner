import { Card, Divider } from "@mui/material";
import { Food } from "../../models/Food";
import "./RecipeCard.css";
import FoodTypeChip from "./food-type-chip/FoodTypeChip";
import FoodFactArray from "../food-card/food-fact-array/FoodFactArray";

const RecipeCard = ({ food }: { food: Food; }) => {
    return <Card className="recipe-card" raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        <div className="recipe-card-title-container">
            <h2>{food.title}</h2>
            {food.foodTypes.map((foodType, index) => <FoodTypeChip key={index} foodType={foodType} />)}
        </div>
        {food.image && <img className="recipe-card-image" src={food.image} alt="completed recipe" />}
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