import { FastfoodOutlined, Favorite, FavoriteBorder, LocalFireDepartmentOutlined } from "@mui/icons-material";
import { Recipe } from "../../../models/Recipe";
import RecipeFact from "../recipe-fact/RecipeFact";
import "./RecipeFactArray.css";
import { RecipeType } from "../../../models/RecipeType";

const RecipeFactArray = ({ recipe }: { recipe: Recipe; }) => {
    return <>
        <RecipeFact
            tooltip={"Calories"}
            icon={<LocalFireDepartmentOutlined />}
            value={recipe.calories}
        />
        <RecipeFact
            tooltip={"Servings"}
            icon={<FastfoodOutlined />}
            value={recipe.servings}
        />
        {recipe.recipeTypes.includes(RecipeType.FRUIT) ? (
            <RecipeFact tooltip={"Fruit"} icon={<Favorite />} />
        ) : null}
        {recipe.recipeTypes.includes(RecipeType.VEGETABLE) ? (
            <RecipeFact tooltip={"Vegetable"} icon={<FavoriteBorder />} />
        ) : null}
    </>;
};

export default RecipeFactArray;