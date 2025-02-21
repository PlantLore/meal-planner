import { Skeleton } from '@mui/material';
import './RecipeDisplay.css';

const RecipeDisplaySkeleton = () => {
    return <Skeleton variant='rounded' sx={{ width: '100%', height: '40rem' }} />;
};

export default RecipeDisplaySkeleton;