import { useState } from "react";
import { MealPlan } from "../../models/MealPlan";
import "./MealPlanEdit.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { MealPlanDay } from "../../models/MealPlanDay";
import MealPlanDayEdit from "./meal-plan-day-edit/MealPlanDayEdit";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router";

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
                />
              </div>
            </div>
          ))}
      </div>
      <div className="meal-plan-edit-footer-container">
        <Divider />
        <div className="meal-plan-edit-submit-container">
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
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MealPlanEdit;
