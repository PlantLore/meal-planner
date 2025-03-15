import { IconButton, TextField } from '@mui/material';
import './IngredientUpsert.css';
import { Delete } from '@mui/icons-material';
import { Ingredient } from '../../../../models/Ingredient';
import { useState } from 'react';
import { validateFraction } from '../../../../utilities/FractionUtils';

const IngredientUpsert = ({ ingredient, onChange, onDelete, submitted }: { ingredient: Ingredient, onChange: (ingredient: Ingredient) => void, onDelete: () => void, submitted: boolean; }) => {
    const [quantityBlur, setQuantityBlur] = useState<boolean>(false);
    const [foodBlur, setFoodBlur] = useState<boolean>(false);

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
        <TextField
            size='small'
            label='Food *'
            slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }}
            sx={{ flex: 2 }}
            defaultValue={ingredient.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ ...ingredient, name: event.target.value });
            }}
            onBlur={() => { setFoodBlur(true); }}
            error={(submitted || foodBlur) && !ingredient.name}
        />
        <IconButton onClick={onDelete}>
            <Delete />
        </IconButton>
    </div>;
};

export default IngredientUpsert;