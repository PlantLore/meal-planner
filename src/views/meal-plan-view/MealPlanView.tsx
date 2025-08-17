import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Skeleton } from "@mui/material";
import MealPlanDisplay from "../../components/meal-plan-display/MealPlanDisplay";
import { MealPlan } from "../../models/MealPlan";
import { getMealPlanById } from "../../services/mealPlanService";
import "./MealPlanView.css";
import MealPlanDisplaySkeleton from "../../components/meal-plan-display/MealPlanDisplaySkeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Edit, LocalGroceryStore, MoreVert } from "@mui/icons-material";

const MealPlanView = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  let { mealPlanId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      mealPlanId
        ? setMealPlan(getMealPlanById(+mealPlanId))
        : setMealPlan(getMealPlanById(1));
    }, 250);
  }, [mealPlanId]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="meal-plan-view-container">
      <div className="max-page-content">
        <div className="meal-plan-view-title-container">
          {mealPlan ? (
            <span className="meal-plan-view-flex-spacer"></span>
          ) : (
            <></>
          )}
          <h1 className="meal-plan-view-title">Meal Plan</h1>
          {mealPlan ? (
            <span className="meal-plan-view-edit-button meal-plan-view-flex-spacer">
              <IconButton
                onClick={handleMenuOpen}
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{'& .MuiMenu-paper': {backgroundColor: "var(--card-color)"}}}
              >
                <MenuItem
                  component={Link}
                  to={`/mealplans/edit/${mealPlan.id}`}
                  onClick={handleMenuClose}
                >
                  <ListItemIcon>
                    <Edit fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`/grocerylist/mealplan/${mealPlan.id}`}
                  onClick={handleMenuClose}
                >
                  <ListItemIcon>
                    <LocalGroceryStore fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Grocery List</ListItemText>
                </MenuItem>
              </Menu>
            </span>
          ) : (
            <></>
          )}
        </div>
        {mealPlan ? (
          <h1 className="meal-plan-view-title meal-plan-view-date">
            {mealPlan?.startDate.toLocaleDateString()} -{" "}
            {mealPlan?.endDate.toLocaleDateString()}
          </h1>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Skeleton variant="text" sx={{ fontSize: "3em", width: "20rem" }} />
          </div>
        )}
        <div className="meal-plan-view-display-container">
          {mealPlan ? (
            <MealPlanDisplay mealPlan={mealPlan} />
          ) : (
            <>
              <MealPlanDisplaySkeleton /> <MealPlanDisplaySkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanView;
