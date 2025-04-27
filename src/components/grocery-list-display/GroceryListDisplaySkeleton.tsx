import GroceryListSectionDisplaySkeleton from './grocery-list-section-display/GroceryListSectionDisplaySkeleton';
import './GroceryListDisplay.css';

const GroceryListDisplaySkeleton = () => {
    const arr = [0, 1, 2, 3, 4];
    return <div className='grocery-list-display-container'>
        {arr.map((key: number) => <GroceryListSectionDisplaySkeleton key={key} />)}
    </div>;
};

export default GroceryListDisplaySkeleton;