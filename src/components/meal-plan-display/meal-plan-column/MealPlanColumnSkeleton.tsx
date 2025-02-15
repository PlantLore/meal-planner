import { Skeleton } from '@mui/material';
import './MealPlanColumn.css';

const MealPlanColumnSkeleton = () => {
    return <span className='meal-plan-column'>
        <h3 className='meal-plan-column-title'><Skeleton variant='text' sx={{ fontSize: '1.5em' }} /></h3>
        <div className='meal-plan-food-card'><Skeleton variant='rounded' sx={{ maxWidth: '25rem', minWidth: '15rem', height: '14.25rem' }} /></div>
        <div className='meal-plan-food-card'><Skeleton variant='rounded' sx={{ maxWidth: '25rem', minWidth: '15rem', height: '5.75rem' }} /></div>
    </span>;
};

export default MealPlanColumnSkeleton;