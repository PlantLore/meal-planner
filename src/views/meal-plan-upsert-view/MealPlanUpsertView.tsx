import { useEffect, useState } from "react";
import MealPlanUpsert from "../../components/meal-plan-upsert/MealPlanUpsert";
import { MealPlan } from "../../models/MealPlan";
import "./MealPlanUpsertView.css";
import { useBlocker, useNavigate, useParams } from "react-router";
import {
  deleteMealPlan,
  getMealPlanById,
  upsertMealPlan,
} from "../../services/mealPlanService";
import { Button, Fade, Modal, Paper, Skeleton } from "@mui/material";
import MealPlanDisplaySkeleton from "../../components/meal-plan-display/MealPlanDisplaySkeleton";

const MealPlanUpsertView = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(new MealPlan());
  const [loading, setLoading] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);
  let { mealPlanId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (mealPlanId) {
      setTimeout(() => {
        mealPlanId && setMealPlan(getMealPlanById(+mealPlanId));
        setLoading(false);
      }, 250);
    } else {
      setLoading(false);
    }
  }, [mealPlanId]);

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
              }}>
                <div>Are you sure you want to leave? Any unsaved changes will be lost.</div>
                <div className="navigation-warning-actions-container">
                  <Button variant="contained" onClick={() => setShowNavigationWarning(false)}>
                    No
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      setShowNavigationWarning(false)
                      setSaved(true);
                      setTimeout(() => {
                        if (navigationTarget != null) navigate(navigationTarget);
                      })
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
