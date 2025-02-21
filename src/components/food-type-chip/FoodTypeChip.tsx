import { Chip } from "@mui/material";
import { FoodType } from "../../models/FoodType";
import "./FoodTypeChip.css";

const FoodTypeChip = ({ foodType }: { foodType: FoodType; }) => {
    const getFoodTypeColor = (foodType: FoodType): string => {
        switch (foodType) {
            case FoodType.SWEET_TREAT: return 'sweet-treat';
            default: return foodType.toLowerCase();
        }
    };
    return <Chip label={foodType} style={{ backgroundColor: `var(--${getFoodTypeColor(foodType)}-color)`, fontSize: '.9rem' }} />;
};

export default FoodTypeChip;