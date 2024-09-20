import { Card } from "@mui/material";

type FoodCardProps = {
    food: string;
};

const FoodCard = (props: FoodCardProps) => {
    return (
        <Card>
            <p>Hello World {props.food}</p>
        </Card>
    );
};

export default FoodCard;