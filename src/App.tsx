import "./App.css";
import FoodCard from "./components/food-card/FoodCard";
import { Food } from "./models/Food";

const App = () => {
  const food: Food = new Food();
  return (
    <div style={{ margin: "1rem" }}>
      <FoodCard food={food}></FoodCard>
    </div>
  );
};

export default App;
