import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, Paper, TextField } from '@mui/material';
import { GroceryListItem } from '../../../models/GroceryListItem';
import './GroceryListSectionDisplay.css';
import { GroceryListSection } from '../../../models/GroceryListSection';
import { AddCircleOutline, CheckCircleOutline, Delete, ReadMoreOutlined } from '@mui/icons-material';
import { ReactElement, useState } from 'react';

const GroceryListSectionDisplay = ({ groceryListSection, groceryListSectionChange, onPendingChange }: 
    { groceryListSection: GroceryListSection, groceryListSectionChange: (groceryListSection: GroceryListSection) => void, onPendingChange?: (pendingChange: boolean, id: number) => void; }) => {

    const [shownRecipeIds, setShownRecipeIds] = useState<number[]>([]);
    const [newGroceries, setNewGroceries] = useState<{ id: number, name: string }[]>([]);
    const [newGroceryIdCounter, setNewGroceryIdCounter] = useState<number>(-1);

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

    const createGroceryItem = (id: number) => {
        const newGrocery = newGroceries.find(grocery => grocery.id === id);
        if (newGrocery && newGrocery.name.trim() !== "") {
            if (!groceryListSection.addedGroceries) groceryListSection.addedGroceries = [];
            groceryListSection.addedGroceries.push({ id: id, name: newGrocery.name, checked: false });
            groceryListSectionChange(groceryListSection);
            deleteGroceryItem(id);
        }
    }

    const deleteGroceryItem = (id: number) => {
        setNewGroceries(newGroceries.filter(grocery => grocery.id !== id));
        if (onPendingChange && newGroceries.filter(grocery => grocery.id !== id).length <= 0) onPendingChange(false, groceryListSection.id);
    }

    const updateNewGroceryName = (id: number, name: string) => {
        const updatedNewGroceries = newGroceries.map(grocery => {
            if (grocery.id === id) {
                return { ...grocery, name: name };
            }
            return grocery;
        });
        setNewGroceries(updatedNewGroceries);
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
            {groceryListSection.addedGroceries && <FormGroup> {groceryListSection.addedGroceries.map((addedGrocery) =>
                <FormControlLabel
                    key={addedGrocery.id}
                    control={<Checkbox
                        checked={addedGrocery.checked}
                        onChange={(
                            (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                addedGrocery.checked = checked;
                                groceryListSectionChange(groceryListSection);
                            })} />
                    }
                    label={addedGrocery.name} />)}
            </FormGroup>}
            {newGroceries.map((newGroceryItem) =>
                <span className="grocery-list-section-add-grocery-container" key={newGroceryItem.id}>
                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            updateNewGroceryName(newGroceryItem.id, event.target.value);
                        }}
                        size="small"
                        label="Grocery Item"
                        required>

                    </TextField>
                    <IconButton onClick={() => { createGroceryItem(newGroceryItem.id) }} sx={{ color: "green", backgroundColor: "var(--card-color)", '&:hover': { backgroundColor: "var(--card-color-hover)" } }}>
                        <CheckCircleOutline />
                    </IconButton>
                    <IconButton onClick={() => { deleteGroceryItem(newGroceryItem.id) }} sx={{ backgroundColor: "var(--card-color)", '&:hover': { backgroundColor: "var(--card-color-hover)" } }}>
                        <Delete />
                    </IconButton>
                </span>)
            }
            <Button
                variant="text"
                onClick={() => { 
                    setNewGroceries([...newGroceries, { id: newGroceryIdCounter, name: "" }]); 
                    setNewGroceryIdCounter(newGroceryIdCounter - 1);
                    if (onPendingChange) onPendingChange(true, groceryListSection.id); 
                }}
                startIcon={<AddCircleOutline
                    color="primary" />}
                sx={{ marginTop: '.5rem', justifyContent: 'flex-start' }}
                fullWidth>
                Add Grocery
            </Button>
        </div>
    </Paper>
};

export default GroceryListSectionDisplay;