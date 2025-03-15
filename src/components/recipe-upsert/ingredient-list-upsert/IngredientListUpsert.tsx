import { IconButton, Tooltip } from '@mui/material';
import './IngredientListUpsert.css';
import { AddCircleOutline } from '@mui/icons-material';
import { useState } from 'react';
import { Ingredient } from '../../../models/Ingredient';
import IngredientUpsert from './ingredient-upsert/IngredientUpsert';

const IngredientListUpsert = ({ initialIngredients, onChange, submitted }: { initialIngredients: Ingredient[], onChange: (updatedIngredient: Ingredient[]) => void, submitted: boolean; }) => {
    const [idCounter, setIdCounter] = useState<number>(-1);
    const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);

    const handleAddOne = () => {
        const newIngredients = [...ingredients, { ...new Ingredient(), id: idCounter }];
        setIngredients(newIngredients);
        onChange(newIngredients);
        setIdCounter(idCounter - 1);
    };

    const handleUpdateIngredient = (index: number, ingredient: Ingredient) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = ingredient;
        setIngredients(newIngredients);
        onChange(newIngredients);
    };

    const handleDeleteIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
        onChange(newIngredients);
    };

    return <div className='ingredient-list-upsert-container'>
        {ingredients.map((ingredient: Ingredient, index: number) =>
            <span key={ingredient.id}>
                <IngredientUpsert
                    ingredient={ingredient}
                    onChange={(updatedIngredient: Ingredient) => { handleUpdateIngredient(index, updatedIngredient); }}
                    onDelete={() => { handleDeleteIngredient(index); }}
                    submitted={submitted}
                />
            </span>)}
        <Tooltip title='Add Ingredient'>
            <IconButton onClick={handleAddOne}>
                <AddCircleOutline color='primary' />
            </IconButton>
        </Tooltip>
    </div>;
};

export default IngredientListUpsert;