import { Card } from "@mui/material";
import { Food } from "../../models/Food";
import "./RecipieDisplay.css";
import FoodFact from "../food-card/food-fact/FoodFact";
import { FastfoodOutlined, LocalFireDepartmentOutlined } from "@mui/icons-material";
import FoodTypeChip from "./food-type-chip/FoodTypeChip";

const RecipieDisplay = ({ food }: { food: Food; }) => {
    return <Card raised={false} sx={{ borderRadius: ".75rem" }}>
        <h3>{food.title}</h3>
        {food.foodTypes.map((foodType, index) => <FoodTypeChip key={index} foodType={foodType} />)}
        <FoodFact
            tooltip={"Calories"}
            icon={<LocalFireDepartmentOutlined />}
            value={food.calories}
        />
        <FoodFact
            tooltip={"Servings"}
            icon={<FastfoodOutlined />}
            value={food.servings}
        />
        <p>food types:</p>
        <ul>
            {food.foodTypes.map((foodType, index) => <li key={index}>{foodType}</li>)}
        </ul>
        <p>ingredients: </p>
        <ul>
            {food.ingredient.map((ingredient, index) => <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>)}
        </ul>
        <img src={food.image} alt="completed recipie" />
        <p>recipie:</p>
        <ol>
            {food.recipie.map((step, index) => <li key={index}>
                {step.text}
                <ul>
                    {step.ingredients.map((ingredient, index) => <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>)}
                </ul>
            </li>)}
        </ol>
    </Card>;
};

export default RecipieDisplay;