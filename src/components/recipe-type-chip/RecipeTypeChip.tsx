import { Chip } from "@mui/material";
import { RecipeType } from "../../models/RecipeType";
import "./RecipeTypeChip.css";

const RecipeTypeChip = ({ recipeType }: { recipeType: RecipeType; }) => {
    const getRecipeTypeColor = (recipeType: RecipeType): string => {
        switch (recipeType) {
            case RecipeType.SWEET_TREAT: return 'sweet-treat';
            default: return recipeType.toLowerCase();
        }
    };
    return <Chip label={recipeType} style={{ backgroundColor: `var(--${getRecipeTypeColor(recipeType)}-color)`, fontSize: '.9rem' }} />;
};

export default RecipeTypeChip;