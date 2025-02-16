import { Routes, Route } from "react-router";
import "./App.css";
import NavBar from "./components/nav-bar/NavBar";
import MealPlanView from "./views/meal-plan-view/MealPlanView";
import RecipeView from "./views/recipe-view/RecipeView";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<MealPlanView />} />
        <Route path="/recipe" element={<RecipeView />} />
      </Routes>
    </div>
  );
};

export default App;
