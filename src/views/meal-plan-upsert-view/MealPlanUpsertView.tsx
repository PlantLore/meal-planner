import { useEffect, useState } from "react";
import MealPlanUpsert from "../../components/meal-plan-upsert/MealPlanUpsert";
import { MealPlan } from "../../models/MealPlan";
import "./MealPlanUpsertView.css";
import { useBlocker, useLocation, useNavigate, useParams } from "react-router";
import {
  deleteMealPlan,
  getMealPlanById,
  upsertMealPlan,
} from "../../services/mealPlanService";
import { Button, Fade, Modal, Paper, Skeleton } from "@mui/material";
import MealPlanDisplaySkeleton from "../../components/meal-plan-display/MealPlanDisplaySkeleton";
import { useAuth0 } from "@auth0/auth0-react";

const MealPlanUpsertView = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(new MealPlan());
  const [loading, setLoading] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);
  const [copy, setcopy] = useState<boolean>(false);
  let { mealPlanId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const location = useLocation();

  useBlocker(({ nextLocation }) => {
    if (!saved) {
      setNavigationTarget(nextLocation.pathname);
      setShowNavigationWarning(true);
      return true;
    }
    return false;
  })

  const handleMealPlanEdit = (updatedMealPlan: MealPlan, deleted?: boolean) => {
    if (deleted) {
      deleteMealPlan(updatedMealPlan.id);
      setSaved(true);
      setTimeout(() => {
        navigate("/mealplans");
      });
      return;
    }
    const newMealPlan = upsertMealPlan(updatedMealPlan)
    setMealPlan(newMealPlan);
    setSaved(true);
    setTimeout(() => {
      navigate("/mealplans/" + newMealPlan.id);
    });
  };

  const handleStartDateSelected = (startDate: Date): void => {
    const currentMealPlan = mealPlan;
    
    const dateDifference = startDate.getTime() - currentMealPlan.startDate.getTime();
    currentMealPlan.startDate = new Date(currentMealPlan.startDate.getTime() + dateDifference);
    currentMealPlan.endDate = new Date(currentMealPlan.endDate.getTime() + dateDifference);
    
    currentMealPlan.mealPlanDays.forEach((mealPlanDay) => {
      mealPlanDay.day = new Date(mealPlanDay.day.getTime() + dateDifference);
    });

    setMealPlan(currentMealPlan);
    setcopy(false);
  }

  const copyMealPlan = (originalMealPlan: MealPlan): MealPlan => {
    let idCounter = -100000;
    originalMealPlan.id = idCounter--;
    originalMealPlan.mealPlanDays.forEach(day => {
      day.id = idCounter--;
      day.meals.forEach(meal => {
        meal.id = idCounter--;
        meal.mealRecipes.forEach(mealRecipe => {
          mealRecipe.id = idCounter--;
        });
      });
    });
    return originalMealPlan;
  }

  useEffect(() => {
    if (mealPlanId) {
      setTimeout(() => {
        if (mealPlanId && getMealPlanById(+mealPlanId)?.creatorEmail !== user?.email && !location.pathname.includes('/copy/')) {
          setSaved(true);
          setTimeout(() => {
            navigate("/mealplans");
          })
          return;
        }
        if (mealPlanId) {
          if (location.pathname.includes('/copy/')) {
            const originalMealPlan = getMealPlanById(+mealPlanId);
            if (originalMealPlan) {
              setcopy(true);
              setMealPlan(copyMealPlan(originalMealPlan));
            }
          } else {
            setMealPlan(getMealPlanById(+mealPlanId));
          }
        }
        setLoading(false);
      }, 250);
    } else {
      setLoading(false);
    }
  }, [mealPlanId, user, navigate, location]);

  return (
    <div className="meal-plan-edit-view-container">
      <div className="max-page-content">
        <div className="meal-plan-edit-view-title-container">
          <h1 className="meal-plan-edit-view-title">Meal Plan</h1>
        </div>
        {!loading ? (
          <MealPlanUpsert
            initialMealPlan={mealPlan}
            onSubmit={handleMealPlanEdit}
            copy={copy}
            handleStartDateSelected={handleStartDateSelected}
          ></MealPlanUpsert>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Skeleton
                variant="text"
                sx={{ fontSize: "5em", width: "35rem" }}
              />
            </div>
            <MealPlanDisplaySkeleton /> <MealPlanDisplaySkeleton />
          </>
        )}
        <Modal
          open={showNavigationWarning}
          onClose={() => setShowNavigationWarning(false)}>
          <Fade in={showNavigationWarning} timeout={250}>
            <div className="modal-navigation-warning-container">
              <Paper elevation={3} sx={{
                width: 'fit-content',
                maxWidth: '30vw',
                height: 'fit-content',
                backgroundColor: 'var(--card-color)',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: '2px',
                padding: '1rem',
                gap: '1rem',
                fontSize: '1.2rem',
                borderRadius: '.75rem'
              }}>
                <div>Are you sure you want to leave? Any unsaved changes will be lost.</div>
                <div className="navigation-warning-actions-container">
                  <Button
                    variant="contained"
                    onClick={() => setShowNavigationWarning(false)}
                    sx={{
                      backgroundColor: 'var(--button-positive-color)',
                      '&:hover': {
                        backgroundColor: 'var(--button-positive-hover-color)',
                      },
                      color: 'white',
                    }}
                  >
                    No
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowNavigationWarning(false)
                      setSaved(true);
                      setTimeout(() => {
                        if (navigationTarget != null) navigate(navigationTarget);
                      })
                    }}
                    sx={{
                      backgroundColor: 'var(--button-negative-color)',
                      '&:hover': {
                        backgroundColor: 'var(--button-negative-hover-color)',
                      },
                      color: 'white',
                    }}
                  >
                    Yes
                  </Button>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default MealPlanUpsertView;
