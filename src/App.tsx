import "./App.css";
import FoodCard from "./components/food-card/FoodCard";
import MealPlan from "./components/meal-plan/MealPlan";
import { Food } from "./models/Food";
import { FoodType } from "./models/FoodType";

const App = () => {
  const foods: Food[] = [
    {
      id: 0,
      title: "Spaghetti",
      recipie: "",
      servings: 4,
      calories: 600,
      foodTypes: [FoodType.DINNER],
      ingredient: [],
      image: "https://i.imgur.com/8ewJgNK.png",
    },
  ];

  const generateFoodCard = (food: Food) => {
    return (
      <div style={{ margin: "1rem" }} key={food.id}>
        <FoodCard food={food} />
      </div>
    );
  };

  return (
    <div>
      {foods.map((food: Food) => {
        return generateFoodCard(food);
      })}
      <div style={{ margin: "1rem" }}>
        <MealPlan></MealPlan>
      </div>
    </div>
  );
};

export default App;
