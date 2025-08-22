import { createContext, useState } from "react";
import { MealPlan } from "../../models/MealPlan";
import "./MealPlanEdit.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { MealPlanDay } from "../../models/MealPlanDay";
import MealPlanDayEdit from "./meal-plan-day-edit/MealPlanDayEdit";
import { Button, Divider, Fade, Modal, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import { DndContext, DragEndEvent, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { MealRecipe } from "../../models/MealRecipe";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { ContentCopyOutlined, FastForward } from "@mui/icons-material";

export const MealRecipeIdCounterContext = createContext(0);

const MealPlanEdit = ({
  initialMealPlan,
  onSubmit,
}: {
  initialMealPlan: MealPlan;
  onSubmit: (mealPlan: MealPlan) => void;
}) => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(initialMealPlan);
  const [blurFields, setBlurFields] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [mealRecipeIdCounter, setMealRecipeIdCounter] = useState(0);
  const [open, setOpen] = useState(false);
  const [mealRecipeId, setMealRecipeId] = useState<number | null>(null);
  const [mealId, setMealId] = useState<number | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    if (!mealPlan.startDate || !mealPlan.endDate) return;

    onSubmit(mealPlan);
  };

  const dateChange = (
    date: Dayjs | null,
    type: "startDate" | "endDate"
  ): void => {
    const newMealPlan = { ...mealPlan };
    if (!date) {
      delete newMealPlan[type];
    } else {
      newMealPlan[type] = date.toDate();
    }

    if (newMealPlan.startDate && newMealPlan.endDate) {
      const dates: Date[] = [];

      let currentDate = new Date(
        newMealPlan.startDate.getFullYear(),
        newMealPlan.startDate.getMonth(),
        newMealPlan.startDate.getDate()
      );

      while (currentDate <= newMealPlan.endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      newMealPlan.mealPlanDays = newMealPlan.mealPlanDays.filter(
        (mealPlanDay: MealPlanDay) =>
          dates
            .map((date: Date) => date.toDateString())
            .includes(mealPlanDay.day.toDateString())
      );

      dates.forEach((date: Date) => {
        if (
          newMealPlan.mealPlanDays.filter(
            (mealPlanDay: MealPlanDay) =>
              mealPlanDay.day.toDateString() === date.toDateString()
          ).length > 0
        )
          return;
        newMealPlan.mealPlanDays.push({ ...new MealPlanDay(), day: date });
      });
    }

    setMealPlan(newMealPlan);
  };

  const mealPlanDayChange = (mealPlanDay: MealPlanDay, index: number) => {
    const newMealPlanDays = [...mealPlan.mealPlanDays];
    newMealPlanDays[index] = mealPlanDay;
    setMealPlan({ ...mealPlan, mealPlanDays: newMealPlanDays });
  };

  const handleFieldBlur = (field: string) => {
    if (blurFields.includes(field)) return;
    setBlurFields([...blurFields, field]);
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { over, active } = event;
    if (!over) return;

    setMealRecipeId(active.id as number);
    setMealId(over.id as number);
    handleOpen();
  }

  const moveMealRecipe = (mealRecipeId: number, mealId: number) => {
    const newMealPlanDays: MealPlanDay[] = mealPlan.mealPlanDays;
    const mealToUpdate = findMealRecipe(mealRecipeId as number);

    if (!mealToUpdate) return;

    newMealPlanDays.forEach((mealPlanDay) => {
      mealPlanDay.meals.forEach((meal) => {
        if (meal.mealRecipes.includes(mealToUpdate)) {
          meal.mealRecipes.splice(meal.mealRecipes.indexOf(mealToUpdate), 1);
        }
        if (meal.id === mealId) {
          meal.mealRecipes.push(mealToUpdate);
        }
      });
    });

    setMealPlan({ ...mealPlan, mealPlanDays: newMealPlanDays });
    handleClose();
  }

  const makeLeftovers = (mealRecipeId: number, mealId: number) => {
    const newMealPlanDays: MealPlanDay[] = mealPlan.mealPlanDays;
    const mealToCopy = findMealRecipe(mealRecipeId);
    
    if (!mealToCopy) return;
    
    const leftoverMeal = { ...mealToCopy, id: mealRecipeIdCounter, leftovers: true };
    setMealRecipeIdCounter(mealRecipeIdCounter - 1);

    newMealPlanDays.forEach((mealPlanDay) => {
      mealPlanDay.meals.forEach((meal) => {
        if (meal.id === mealId) {
          meal.mealRecipes.push(leftoverMeal);
        }
      });
    });

    setMealPlan({ ...mealPlan, mealPlanDays: newMealPlanDays });
    handleClose();
  }

  const findMealRecipe = (id: number): MealRecipe | null => {
    for (const mealPlanDay of mealPlan.mealPlanDays) {
      for (const meal of mealPlanDay.meals) {
        const foundRecipe = meal.mealRecipes.find(
          (recipe) => recipe.id === id
        );
        if (foundRecipe) {
          return foundRecipe;
        }
      }
    }
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="meal-plan-edit-content-container">
        <div className="meal-plan-edit-date-container">
          <DatePicker
            label="Start Date"
            maxDate={mealPlan.endDate ? dayjs(mealPlan.endDate) : undefined}
            sx={{
              backgroundColor: "var(--card-color)",
            }}
            slotProps={{
              desktopPaper: {
                sx: {
                  backgroundColor: "var(--card-color)",
                  borderRadius: ".75rem",
                },
              },
              textField: {
                error:
                  (blurFields.includes("startDate") || submitted) &&
                  !mealPlan.startDate,
                onBlur: () => {
                  handleFieldBlur("startDate");
                },
              },
            }}
            defaultValue={mealPlan.id ? dayjs(mealPlan.startDate) : null}
            onChange={(startDate: Dayjs | null) => {
              dateChange(startDate, "startDate");
            }}
          />
          <DatePicker
            label="End Date"
            minDate={mealPlan.startDate ? dayjs(mealPlan.startDate) : undefined}
            sx={{
              backgroundColor: "var(--card-color)",
            }}
            slotProps={{
              desktopPaper: {
                sx: {
                  backgroundColor: "var(--card-color)",
                  borderRadius: ".75rem",
                },
              },
              textField: {
                error:
                  (blurFields.includes("endDate") || submitted) &&
                  !mealPlan.endDate,
                onBlur: () => {
                  handleFieldBlur("endDate");
                },
              },
            }}
            defaultValue={mealPlan.id ? dayjs(mealPlan.endDate) : null}
            onChange={(endDate: Dayjs | null) => {
              dateChange(endDate, "endDate");
            }}
          />
        </div>
        <MealRecipeIdCounterContext.Provider value={mealRecipeIdCounter}>
          <DndContext onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToWindowEdges]} autoScroll={{ layoutShiftCompensation: false }}>
            {mealPlan.mealPlanDays
              .sort((current, next) => (current.day > next.day ? 1 : -1))
              .map((mealPlanDay: MealPlanDay, index: number) => (
                <div key={mealPlanDay.id}>
                  <h1 className="meal-plan-day-edit-date-title">
                    {mealPlanDay.day.toLocaleDateString()}
                  </h1>
                  <div className="meal-plan-day-display-edit-container">
                    <MealPlanDayEdit
                      initialMealPlanDay={mealPlanDay}
                      mealPlanDayChange={(mealPlanDay: MealPlanDay) => {
                        mealPlanDayChange(mealPlanDay, index);
                      }}
                      setMealRecipeIdCounter={setMealRecipeIdCounter}
                    />
                  </div>
                </div>
              ))}
          </DndContext>
        </MealRecipeIdCounterContext.Provider>
      </div>
      <div className="meal-plan-edit-footer-container">
        <Divider />
        <div className="meal-plan-edit-submit-container max-page-content">
          <Button
            type="reset"
            color="error"
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open} timeout={250}>
          <div className="modal-recipe-move-container">
            <Paper onClick={() => {mealRecipeId && mealId && moveMealRecipe(mealRecipeId, mealId)}} elevation={3} sx={{
              width: '20vw',
              height: '40vh',
              backgroundColor: 'var(--card-color)',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '2px',
              '&:hover': {
                cursor: 'pointer',
                border: '2px solid var(--dinner-color)',
                margin: '0'
              }
            }}>
              <FastForward sx={{ color: 'rgb(73, 73, 73)', fontSize: '10rem' }} />
              <p className="modal-recipe-move-text">Move</p>
            </Paper>
            <Paper onClick={() => {mealRecipeId && mealId && makeLeftovers(mealRecipeId, mealId)}} elevation={3} sx={{
              width: '20vw',
              height: '40vh',
              backgroundColor: 'var(--card-color)',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '2px',
              '&:hover': {
                cursor: 'pointer',
                border: '2px solid var(--dinner-color)',
                margin: '0'
              }
            }}>
              <ContentCopyOutlined sx={{ color: 'rgb(73, 73, 73)', fontSize: '9.5rem' }} />
              <p className="modal-recipe-move-text">Leftovers</p>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </form>
  );
};

export default MealPlanEdit;
