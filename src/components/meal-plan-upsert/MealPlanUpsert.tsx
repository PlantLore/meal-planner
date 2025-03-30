import { useState } from 'react';
import { MealPlan } from '../../models/MealPlan';
import './MealPlanUpsert.css';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { MealPlanDay } from '../../models/MealPlanDay';
import MealPlanDayUpsert from './meal-plan-day-upsert/MealPlanDayUpsert';

const MealPlanUpsert = ({ initialMealPlan }: { initialMealPlan: MealPlan; }) => {
    const [mealPlan, setMealPlan] = useState<MealPlan>(initialMealPlan);

    return <>
        <div className='meal-plan-upsert-title-container'>
            <h1 className='meal-plan-upsert-title'>Meal Plan</h1>
        </div>
        <div className='meal-plan-upsert-date-container'>
            <DatePicker
                label='Start Date'
                maxDate={mealPlan.endDate ? dayjs(mealPlan.endDate) : undefined}
                sx={{
                    backgroundColor: 'var(--card-color)'
                }}
                slotProps={{
                    desktopPaper: {
                        sx: {
                            backgroundColor: 'var(--card-color)',
                            borderRadius: '.75rem'
                        }
                    }
                }}
            />
            <DatePicker
                label='End Date'
                minDate={mealPlan.startDate ? dayjs(mealPlan.startDate) : undefined}
                sx={{
                    backgroundColor: 'var(--card-color)'
                }}
                slotProps={{
                    desktopPaper: {
                        sx: {
                            backgroundColor: 'var(--card-color)',
                            borderRadius: '.75rem'
                        }
                    }
                }}
            />
        </div>
        {mealPlan.mealPlanDays
            .sort((current, next) => current.day > next.day ? 1 : -1)
            .map((mealPlanDay: MealPlanDay) =>
                <div className='meal-plan-day-upsert-container' key={mealPlanDay.id}>
                    <h1 className='meal-plan-day-upsert-date-title'>{mealPlanDay.day.toLocaleDateString()}</h1>
                    <MealPlanDayUpsert />
                </div>
            )
        }
    </>;
};

export default MealPlanUpsert;