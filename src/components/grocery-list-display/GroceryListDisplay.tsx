import { GroceryList } from '../../models/GroceryList';
import { GroceryListSection } from '../../models/GroceryListSection';
import GroceryListSectionDisplay from './grocery-list-section-display/GroceryListSectionDisplay';
import './GroceryListDisplay.css';

const GroceryListDisplay = ({ groceryList, onChange }: { groceryList: GroceryList, onChange: (groceryList: GroceryList) => void; }) => {

    const groceryListSectionChange = (groceryListSection: GroceryListSection) => {
        const newGroceryList = { ...groceryList };
        const sectionToReplace = newGroceryList.grocerySections.find((listSection: GroceryListSection) => listSection.id === groceryListSection.id);
        if (sectionToReplace) {
            sectionToReplace.groceries = groceryListSection.groceries;
        } else {
            newGroceryList.grocerySections.push(groceryListSection);
        }
        onChange(newGroceryList);
    };

    return <div className='grocery-list-display-container'>
        {groceryList.grocerySections.map((groceryListSection: GroceryListSection) =>
            <GroceryListSectionDisplay key={groceryListSection.id} groceryListSection={groceryListSection} groceryListSectionChange={groceryListSectionChange} />
        )}
    </div>;
};

export default GroceryListDisplay;