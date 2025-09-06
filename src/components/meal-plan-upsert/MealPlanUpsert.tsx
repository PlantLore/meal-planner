import { createContext, useState } from "react";
import { MealPlan } from "../../models/MealPlan";
import "./MealPlanUpsert.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { MealPlanDay } from "../../models/MealPlanDay";
import MealPlanDayUpsert from "./meal-plan-day-upsert/MealPlanDayUpsert";
import { Button, Divider, Fade, Modal, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import { DndContext, DragEndEvent, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { MealRecipe } from "../../models/MealRecipe";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { ContentCopyOutlined, CopyAllOutlined, FastForward, LocalFireDepartmentOutlined } from "@mui/icons-material";
import RecipeFact from "../recipe-card/recipe-fact/RecipeFact";

export const MealRecipeIdCounterContext = createContext(0);
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MealPlanUpsert = ({
  initialMealPlan,
  onSubmit,
}: {
  initialMealPlan: MealPlan;
  onSubmit: (mealPlan: MealPlan, deleted?: boolean) => void;
}) => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(initialMealPlan);
  const [blurFields, setBlurFields] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [mealRecipeIdCounter, setMealRecipeIdCounter] = useState(-1);
  const [mealPlanDayIdCounter, setMealPlanDayIdCounter] = useState(-1);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [mealRecipeId, setMealRecipeId] = useState<number | null>(null);
  const [mealId, setMealId] = useState<number | null>(null);

  const handleOpen = () => setOpen(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleClose = () => setOpen(false);
  const handleCloseDelete = () => setOpenDelete(false);

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

      let idCounter = mealPlanDayIdCounter;

      dates.forEach((date: Date) => {
        if (
          newMealPlan.mealPlanDays.filter(
            (mealPlanDay: MealPlanDay) =>
              mealPlanDay.day.toDateString() === date.toDateString()
          ).length > 0
        )
          return;
        newMealPlan.mealPlanDays.push({ ...new MealPlanDay(), day: date, id: idCounter-- });
      });

      setMealPlanDayIdCounter(idCounter);
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

  const makeDuplicate = (mealRecipeId: number, mealId: number) => {
    const newMealPlanDays: MealPlanDay[] = mealPlan.mealPlanDays;
    const mealToCopy = findMealRecipe(mealRecipeId);

    if (!mealToCopy) return;

    const duplicateMeal = { ...mealToCopy, id: mealRecipeIdCounter };
    setMealRecipeIdCounter(mealRecipeIdCounter - 1);

    newMealPlanDays.forEach((mealPlanDay) => {
      mealPlanDay.meals.forEach((meal) => {
        if (meal.id === mealId) {
          meal.mealRecipes.push(duplicateMeal);
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

  const calculateCalories = (mealPlanDay: MealPlanDay): number => {
    return mealPlanDay.meals.reduce(
      (total, meal) =>
        total + meal.mealRecipes.reduce(
          (total, mealRecipe) =>
            total + mealRecipe.recipe.calories, 0
        )
      , 0);
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
                    {dayNames[mealPlanDay.day.getDay()] + " " + mealPlanDay.day.toLocaleDateString()}
                    <span className="meal-plan-upsert-total-calories-container">
                      <RecipeFact tooltip={"Total Calories"} icon={<LocalFireDepartmentOutlined />} value={calculateCalories(mealPlanDay)}></RecipeFact>
                    </span>
                  </h1>
                  <div className="meal-plan-day-display-edit-container">
                    <MealPlanDayUpsert
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
        <div className="meal-plan-edit-actions-container max-page-content">
          <Button
            variant="contained"
            onClick={mealPlan.id > 0 ? handleOpenDelete : () => {
              navigate(-1);
            }}
            sx={{
              margin: ".75rem .5rem",
              backgroundColor: 'var(--button-negative-color)',
              '&:hover': {
                backgroundColor: 'var(--button-negative-hover-color)',
              },
              color: 'white',
            }}>
            Delete
          </Button>
          <div className="meal-plan-edit-submit-container">
            <Button
              type="reset"
              variant="contained"
              onClick={() => {
                navigate(-1);
              }}
              sx={{
                backgroundColor: 'var(--button-negative-color)',
                '&:hover': {
                  backgroundColor: 'var(--button-negative-hover-color)',
                },
                color: 'white',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'var(--button-positive-color)',
                '&:hover': {
                  backgroundColor: 'var(--button-positive-hover-color)',
                },
                color: 'white',
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open} timeout={250}>
          <div className="modal-recipe-move-container">
            <Paper onClick={() => { mealRecipeId && mealId && moveMealRecipe(mealRecipeId, mealId) }} elevation={3} sx={{
              width: '20vw',
              height: '40vh',
              backgroundColor: 'var(--card-color)',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '2px',
              borderRadius: '.75rem',
              '&:hover': {
                cursor: 'pointer',
                border: '2px solid var(--dinner-color)',
                margin: '0'
              }
            }}>
              <FastForward sx={{ color: 'rgb(73, 73, 73)', fontSize: '10rem' }} />
              <p className="modal-recipe-move-text">Move</p>
            </Paper>
            <Paper onClick={() => { mealRecipeId && mealId && makeDuplicate(mealRecipeId, mealId) }} elevation={3} sx={{
              width: '20vw',
              height: '40vh',
              backgroundColor: 'var(--card-color)',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '2px',
              borderRadius: '.75rem',
              '&:hover': {
                cursor: 'pointer',
                border: '2px solid var(--dinner-color)',
                margin: '0'
              }
            }}>
              <ContentCopyOutlined sx={{ color: 'rgb(73, 73, 73)', fontSize: '9.5rem' }} />
              <p className="modal-recipe-move-text">Copy</p>
            </Paper>
            <Paper onClick={() => { mealRecipeId && mealId && makeLeftovers(mealRecipeId, mealId) }} elevation={3} sx={{
              width: '20vw',
              height: '40vh',
              backgroundColor: 'var(--card-color)',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '2px',
              borderRadius: '.75rem',
              '&:hover': {
                cursor: 'pointer',
                border: '2px solid var(--dinner-color)',
                margin: '0'
              }
            }}>
              <CopyAllOutlined sx={{ color: 'rgb(73, 73, 73)', fontSize: '9.5rem' }} />
              <p className="modal-recipe-move-text">Leftovers</p>
            </Paper>
          </div>
        </Fade>
      </Modal>
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <Fade in={openDelete} timeout={250}>
          <div className="modal-delete-meal-plan-container">
            <Paper elevation={3} sx={{
              width: 'fit-content',
              height: 'fit-content',
              backgroundColor: 'var(--card-color)',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '1rem',
              textAlign: 'center',
              gap: '1rem',
              borderRadius: '.75rem',
              fontSize: '1.2rem',
            }}>
              <p className="modal-delete-meal-plan-text">Are you sure you want to delete this meal plan?</p>
              <div className="modal-delete-meal-plan-actions-container">
                <Button
                  variant="contained"
                  onClick={handleCloseDelete}
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
                    handleCloseDelete();
                    onSubmit(mealPlan, true)
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
    </form>
  );
};

export default MealPlanUpsert;
