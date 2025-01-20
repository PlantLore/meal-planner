import { Food } from "../../../models/Food";
import { MealType } from "../../../models/MealType";
import FoodCard from "../../food-card/FoodCard";
import './MealPlanColumn.css';

const MealPlanColumn = ({ mealType, foods }: { mealType: MealType, foods: Food[]; }) => {
    const getTitle = (): string => {
        switch (mealType) {
            case MealType.DINNER:
                return "Dinner";
            case MealType.LUNCH:
                return "Lunch";
            case MealType.BREAKFAST:
                return "Breakfast";
            case MealType.SNACK:
                return "Snacks";
            case MealType.SWEET_TREAT:
                return "Sweet Treats";
        }
    };

    return (
        <span className="meal-plan-column">
            <h3 className="meal-plan-column-title">{getTitle()}</h3>
            {foods.map((food: Food) => <div className="meal-plan-food-card" key={food.id}><FoodCard food={food} mealType={mealType}></FoodCard></div>)}
        </span>
    );
};

export default MealPlanColumn;