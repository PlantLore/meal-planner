import { Autocomplete, IconButton, Paper, TextField } from '@mui/material';
import './IngredientUpsert.css';
import { Delete } from '@mui/icons-material';
import { Ingredient } from '../../../../models/Ingredient';
import React, { useState } from 'react';
import { validateFraction } from '../../../../utilities/FractionUtils';
import { Grocery } from '../../../../models/Grocery';
import GroceryUpsertDialog from '../../../grocery-upsert-dialog/GroceryUpsertDialog';
import { RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../../../reduxSlices/groceriesSlice';

const IngredientUpsert = ({ ingredient, onChange, onDelete, submitted }: { ingredient: Ingredient, onChange: (ingredient: Ingredient) => void, onDelete: () => void, submitted: boolean; }) => {
    const [quantityBlur, setQuantityBlur] = useState<boolean>(false);
    const [recipeBlur, setRecipeBlur] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const groceries = useSelector((state: RootState) => state.groceries.groceries);
    const dispatch = useDispatch();

    const handleGroceryDialogClose = (grocery: Grocery | null) => {
        if (grocery) {
            dispatch(add(grocery));
            onChange({ ...ingredient, grocery: grocery });
        } else onChange({ ...ingredient, grocery: new Grocery() });
        setOpen(false);
    };

    return <div className='ingredient-upsert-container'>
        <TextField
            size='small'
            label='Quantity'
            slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }}
            sx={{ flex: 1 }}
            defaultValue={ingredient.quantity}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ ...ingredient, quantity: event.target.value });
            }}
            onBlur={() => { setQuantityBlur(true); }}
            error={(submitted || quantityBlur) && !validateFraction(ingredient.quantity)}
            helperText={(submitted || quantityBlur) && !validateFraction(ingredient.quantity) ? 'eg. 1 1/2' : ''}
        />
        <TextField
            size='small'
            label='Unit'
            slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }}
            sx={{ flex: 1 }}
            defaultValue={ingredient.unit}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ ...ingredient, unit: event.target.value });
            }}
        />
        <Autocomplete
            size='small'
            options={[...groceries.map((grocery: Grocery) => grocery.name), 'Create New']}
            filterOptions={(options, state) => { return [...options.slice(0, -1).filter((value) => value.toLowerCase().includes(state.inputValue.toLowerCase())), 'Create New']; }}
            freeSolo
            sx={{ flex: 3 }}
            value={ingredient.grocery.name || null}
            onChange={(event: React.SyntheticEvent, value: string | null) => {
                if (value === 'Create New') {
                    setOpen(true);
                } else {
                    onChange({ ...ingredient, grocery: groceries.find((grocery) => grocery.name === value) ?? new Grocery() });
                }
            }}
            PaperComponent={(props) => <Paper {...props} sx={{ backgroundColor: "var(--card-color)" }} />}
            onBlur={() => { setRecipeBlur(true); }}
            renderInput={(params) => <TextField
                {...params}
                error={(submitted || recipeBlur) && !ingredient.grocery.name}
                label='Food *'
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />}
        />
        <IconButton onClick={onDelete} sx={{ margin: 'auto 0' }}>
            <Delete />
        </IconButton>
        <GroceryUpsertDialog open={open} onClose={handleGroceryDialogClose} />
    </div>;
};

export default IngredientUpsert;