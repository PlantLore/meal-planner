import { Skeleton } from '@mui/material';
import './GroceryListSectionDisplay.css';

const GroceryListSectionDisplaySkeleton = () => {
    return <Skeleton variant='rounded' sx={{ width: '15rem', height: '90vh', marginTop: '1.5rem' }} />;
};

export default GroceryListSectionDisplaySkeleton;