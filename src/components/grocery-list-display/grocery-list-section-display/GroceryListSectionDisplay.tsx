import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, Paper } from '@mui/material';
import { GroceryListItem } from '../../../models/GroceryListItem';
import './GroceryListSectionDisplay.css';
import { GroceryListSection } from '../../../models/GroceryListSection';
import { AddCircleOutline, ReadMoreOutlined } from '@mui/icons-material';
import { ReactElement, useState } from 'react';

const GroceryListSectionDisplay = ({ groceryListSection, groceryListSectionChange }: { groceryListSection: GroceryListSection, groceryListSectionChange: (groceryListSection: GroceryListSection) => void; }) => {

    const [shownRecipeIds, setShownRecipeIds] = useState<number[]>([]);

    const generateGroceryListItemLabel = (groceryListItem: GroceryListItem): string => {
        return groceryListItem.quantity + " " + groceryListItem.unit + " " + groceryListItem.grocery.name;
    };

    const generateGroceryListItemBreakdown = (groceryListItem: GroceryListItem): ReactElement[] | undefined => {
        return groceryListItem.recipes?.map(
            (recipe) => {
                const ingredient = recipe.ingredients.find((ingredient) => ingredient.grocery.id = groceryListItem.grocery.id)
                return (
                    <span key={recipe.id} className="grocery-list-section-item-breakdown">
                        {
                            ingredient?.quantity + " " + ingredient?.unit + " for " + recipe.title
                        }
                    </span>
                )
            }
        )
    }

    const handleShowRecipesClick = (groceryListItem: GroceryListItem) => {
        if (shownRecipeIds.includes(groceryListItem.id)) {
            setShownRecipeIds(shownRecipeIds.filter(id => id !== groceryListItem.id));
        } else {
            setShownRecipeIds([...shownRecipeIds, groceryListItem.id]);
        }
    }

    return <Paper
        className="grocery-list-section-paper"
        sx={{ padding: '1rem', backgroundColor: 'var(--card-color)', borderRadius: ".75rem", }}
    >
        <div className="grocery-list-section-container">
            <h2>{groceryListSection.grocerySection}</h2>
            <FormGroup>
                {groceryListSection.groceries.map((groceryListItem: GroceryListItem) =>
                    <span key={groceryListItem.id}>
                        <span className="grocery-list-section-item-container"><FormControlLabel
                            control={<Checkbox
                                checked={groceryListItem.checked}
                                onChange={(
                                    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                        groceryListItem.checked = checked;
                                        groceryListSectionChange(groceryListSection);
                                    })} />
                            }
                            label={generateGroceryListItemLabel(groceryListItem)} />
                            {groceryListItem.recipes &&
                                <IconButton onClick={() => handleShowRecipesClick(groceryListItem)} sx={{ backgroundColor: "var(--card-color)", '&:hover': { backgroundColor: "var(--card-color-hover)" } }}>
                                    <ReadMoreOutlined />
                                </IconButton>
                            }
                        </span>
                        {groceryListItem.recipes && shownRecipeIds.includes(groceryListItem.id) && generateGroceryListItemBreakdown(groceryListItem)}
                    </span>
                )}
            </FormGroup>
            <Button
                variant="text"
                onClick={() => { }}
                startIcon={<AddCircleOutline
                    color="primary" />}
                sx={{ justifyContent: 'flex-start' }}
                fullWidth>
                Add Grocery
            </Button>
        </div>
    </Paper>
};

export default GroceryListSectionDisplay;