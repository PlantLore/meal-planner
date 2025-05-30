import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { GroceryListItem } from '../../../models/GroceryListItem';
import './GroceryListSectionDisplay.css';
import { GroceryListSection } from '../../../models/GroceryListSection';

const GroceryListSectionDisplay = ({ groceryListSection, groceryListSectionChange }: { groceryListSection: GroceryListSection, groceryListSectionChange: (groceryListSection: GroceryListSection) => void; }) => {

    const generateGroceryListItemLabel = (groceryListItem: GroceryListItem): string => {
        return groceryListItem.quantity + " " + groceryListItem.unit + " " + groceryListItem.grocery.name;
    };

    return <div className="grocery-list-section-container">
        <h2>{groceryListSection.grocerySection}</h2>
        <FormGroup>
            {groceryListSection.groceries.map((groceryListItem: GroceryListItem) =>
                <FormControlLabel
                    key={groceryListItem.id}
                    control={<Checkbox
                        checked={groceryListItem.checked}
                        onChange={(
                            (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                groceryListItem.checked = checked;
                                groceryListSectionChange(groceryListSection);
                            })} />
                    }
                    label={generateGroceryListItemLabel(groceryListItem)} />)}
        </FormGroup>
    </div>;
};

export default GroceryListSectionDisplay;