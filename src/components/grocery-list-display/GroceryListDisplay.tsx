import { useState } from 'react';
import { GroceryList } from '../../models/GroceryList';
import { GroceryListSection } from '../../models/GroceryListSection';
import GroceryListSectionDisplay from './grocery-list-section-display/GroceryListSectionDisplay';
import './GroceryListDisplay.css';

const GroceryListDisplay = ({ groceryList, onChange, onPendingChange }: 
    { groceryList: GroceryList, onChange: (groceryList: GroceryList) => void, onPendingChange?: (pending: boolean) => void; }) => {

    const [pendingChanges, setPendingChanges] = useState<{pendingChanges: boolean, id: number}[]>([]);

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

    const onPendingChangeAgg = (pending: boolean, id: number) => {
        const existingPendingChange = pendingChanges.find(change => change.id === id);
        let newPendingChanges = [...pendingChanges];
        if (existingPendingChange) {
            newPendingChanges = newPendingChanges.map(change => {
                if (change.id === id) {
                    return { ...change, pendingChanges: pending };
                }
                return change;
            });
        } else {
            newPendingChanges.push({ id: id, pendingChanges: pending });
        }
        setPendingChanges(newPendingChanges);
        if (onPendingChange) {
            onPendingChange(newPendingChanges.some(change => change.pendingChanges));
        }
    }

    return <div className='grocery-list-display-container'>
        {groceryList.grocerySections.map((groceryListSection: GroceryListSection) =>
            <GroceryListSectionDisplay 
                key={groceryListSection.id} 
                groceryListSection={groceryListSection} 
                groceryListSectionChange={groceryListSectionChange} 
                onPendingChange={onPendingChangeAgg}/>
        )}
    </div>;
};

export default GroceryListDisplay;