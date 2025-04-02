import { Routes, Route } from "react-router";
import "./App.css";
import NavBar from "./components/nav-bar/NavBar";
import MealPlanView from "./views/meal-plan-view/MealPlanView";
import RecipeListView from "./views/recipe-list-view/RecipeListView";
import RecipeView from "./views/recipe-view/RecipeView";
import RecipeUpsertView from "./views/recipe-upsert-view/RecipeUpsertView";
import MealPlanEditView from "./views/meal-plan-edit-view/MealPlanEditView";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MealPlanListView from "./views/meal-plan-list-view/MealPlanListView";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MealPlanView />} />
          <Route path="/recipes/:foodId" element={<RecipeView />} />
          <Route path="/recipes/edit/:foodId" element={<RecipeUpsertView />} />
          <Route path="/recipes/create" element={<RecipeUpsertView />} />
          <Route path="/recipes" element={<RecipeListView />} />
          <Route path="/mealplans/create" element={<MealPlanView />} />
          <Route path="/mealplans/:mealPlanId" element={<MealPlanView />} />
          <Route
            path="/mealplans/edit/:mealPlanId"
            element={<MealPlanEditView />}
          />
          <Route path="/mealplans" element={<MealPlanListView />} />
        </Routes>
      </div>
    </LocalizationProvider>
  );
};

export default App;
