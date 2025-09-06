import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet, Navigate } from "react-router";
import "./App.css";
import NavBar from "./components/nav-bar/NavBar";
import MealPlanView from "./views/meal-plan-view/MealPlanView";
import RecipeListView from "./views/recipe-list-view/RecipeListView";
import RecipeView from "./views/recipe-view/RecipeView";
import RecipeUpsertView from "./views/recipe-upsert-view/RecipeUpsertView";
import MealPlanUpsertView from "./views/meal-plan-upsert-view/MealPlanUpsertView";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MealPlanListView from "./views/meal-plan-list-view/MealPlanListView";
import GroceryListView from "./views/grocery-list-view/GroceryListView";
import LoginView from "./views/login-view/LoginView";
import { useAuth0 } from "@auth0/auth0-react";

const RootLayout = () => {

  const { isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) { return null; };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  };

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginView />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<MealPlanView />} />
        <Route path="/recipes/:recipeId" element={<RecipeView />} />
        <Route path="/recipes/edit/:recipeId" element={<RecipeUpsertView />} />
        <Route path="/recipes/create" element={<RecipeUpsertView />} />
        <Route path="/recipes" element={<RecipeListView />} />
        <Route path="/mealplans/create" element={<MealPlanUpsertView />} />
        <Route path="/mealplans/:mealPlanId" element={<MealPlanView />} />
        <Route
          path="/mealplans/edit/:mealPlanId"
          element={<MealPlanUpsertView />}
        />
        <Route path="/mealplans" element={<MealPlanListView />} />
        <Route path="/grocerylist/current" element={<GroceryListView />} />
        <Route
          path="/grocerylist/mealplan/:mealPlanId"
          element={<GroceryListView />}
        />
      </Route>
    </>
  )
)

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <RouterProvider router={router} />
      </div>
    </LocalizationProvider>
  );
};

export default App;
