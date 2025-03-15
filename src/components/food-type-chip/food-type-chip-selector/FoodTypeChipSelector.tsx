import { useState } from 'react';
import { FoodType } from '../../../models/FoodType';
import './FoodTypeChipSelector.css';
import FoodTypeChip from '../FoodTypeChip';
import { Chip } from '@mui/material';

const FoodTypeChipSelector = ({ chipsChanged, initialChips }: { chipsChanged: (chips: FoodType[]) => void, initialChips?: FoodType[]; }) => {
    const [selectedChips, setSelectedChips] = useState<FoodType[]>(initialChips ?? []);

    const foodTypes: FoodType[] = [
        FoodType.BREAKFAST,
        FoodType.LUNCH,
        FoodType.DINNER,
        FoodType.SIDE,
        FoodType.FRUIT,
        FoodType.VEGETABLE,
        FoodType.SNACK,
        FoodType.SWEET_TREAT
    ];

    const handleChipClick = (foodType: FoodType) => {
        if (selectedChips.includes(foodType)) {
            const selectedFoodTypes = selectedChips.filter((filterFoodType: FoodType) => filterFoodType !== foodType);
            setSelectedChips(selectedFoodTypes);
            chipsChanged(selectedFoodTypes);
        } else {
            const selectedFoodTypes = [...selectedChips, foodType];
            setSelectedChips(selectedFoodTypes);
            chipsChanged(selectedFoodTypes);
        }
    };

    const handleClear = () => {
        setSelectedChips([]);
        chipsChanged([]);
    };

    return <>
        {foodTypes.map((foodType: FoodType, index: number) =>
            <span
                key={index}
                className={selectedChips.includes(foodType) ? 'food-type-chip-selector-container food-type-selected' : 'food-type-chip-selector-container food-type-unselected'}
                onClick={() => { handleChipClick(foodType); }}
            >
                <FoodTypeChip foodType={foodType}></FoodTypeChip>
            </span>
        )}
        {selectedChips.length ?
            <span className='food-type-chip-selector-clear-all' onClick={handleClear}>
                <Chip label='Clear' variant='outlined' style={{ fontSize: '.9rem' }} />
            </span> :
            <></>
        }
    </>;
};

export default FoodTypeChipSelector;