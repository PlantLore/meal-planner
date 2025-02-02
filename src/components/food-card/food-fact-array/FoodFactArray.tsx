import { FastfoodOutlined, Favorite, FavoriteBorder, LocalFireDepartmentOutlined } from "@mui/icons-material";
import { Food } from "../../../models/Food";
import FoodFact from "../food-fact/FoodFact";
import "./FoodFactArray.css";
import { FoodType } from "../../../models/FoodType";

const FoodFactArray = ({ food }: { food: Food; }) => {
    return <>
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
        {food.foodTypes.includes(FoodType.FRUIT) ? (
            <FoodFact tooltip={"Fruit"} icon={<Favorite />} />
        ) : null}
        {food.foodTypes.includes(FoodType.VEGETABLE) ? (
            <FoodFact tooltip={"Vegetable"} icon={<FavoriteBorder />} />
        ) : null}
    </>;
};

export default FoodFactArray;