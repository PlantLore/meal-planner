import { useState } from 'react';
import './RecipeTypeChipSelector.css';
import RecipeTypeChip from '../RecipeTypeChip';
import { Chip } from '@mui/material';
import { RecipeType } from '../../../models/RecipeType';

const RecipeTypeChipSelector = ({ chipsChanged, initialChips }: { chipsChanged: (chips: RecipeType[]) => void, initialChips?: RecipeType[]; }) => {
    const [selectedChips, setSelectedChips] = useState<RecipeType[]>(initialChips ?? []);

    const recipeTypes: RecipeType[] = [
        RecipeType.BREAKFAST,
        RecipeType.LUNCH,
        RecipeType.DINNER,
        RecipeType.SIDE,
        RecipeType.FRUIT,
        RecipeType.VEGETABLE,
        RecipeType.SNACK,
        RecipeType.SWEET_TREAT
    ];

    const handleChipClick = (recipeType: RecipeType) => {
        if (selectedChips.includes(recipeType)) {
            const selectedRecipeTypes = selectedChips.filter((filterRecipeType: RecipeType) => filterRecipeType !== recipeType);
            setSelectedChips(selectedRecipeTypes);
            chipsChanged(selectedRecipeTypes);
        } else {
            const selectedRecipeTypes = [...selectedChips, recipeType];
            setSelectedChips(selectedRecipeTypes);
            chipsChanged(selectedRecipeTypes);
        }
    };

    const handleClear = () => {
        setSelectedChips([]);
        chipsChanged([]);
    };

    return <>
        {recipeTypes.map((recipeType: RecipeType, index: number) =>
            <span
                key={index}
                className={selectedChips.includes(recipeType) ? 'recipe-type-chip-selector-container recipe-type-selected' : 'recipe-type-chip-selector-container recipe-type-unselected'}
                onClick={() => { handleChipClick(recipeType); }}
            >
                <RecipeTypeChip recipeType={recipeType}></RecipeTypeChip>
            </span>
        )}
        {selectedChips.length ?
            <span className='recipe-type-chip-selector-clear-all' onClick={handleClear}>
                <Chip label='Clear' variant='outlined' style={{ fontSize: '.9rem' }} />
            </span> :
            <></>
        }
    </>;
};

export default RecipeTypeChipSelector;