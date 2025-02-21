import { useEffect, useState } from 'react';
import './RecipeListView.css';
import { Food } from '../../models/Food';
import { getAllFoods } from '../../services/foodService';
import RecipeListDisplay from '../../components/recipe-list-display/RecipeListDisplay';
import { Card, TextField } from '@mui/material';
import useDebounce from '../../hooks/useDebounce';
import FoodTypeChipSelector from '../../components/food-type-chip/food-type-chip-selector/FoodTypeChipSelector';
import { FoodType } from '../../models/FoodType';

const RecipeListView = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [recipeFilter, setRecipeFilter] = useState<string>('');
    const [selectedFoodTypes, setSelectedFoodTypes] = useState<FoodType[]>([]);
    const debouncedRecipeFilter: string = useDebounce<string>(recipeFilter, 500);

    useEffect(() => {
        setTimeout(() => {
            setFoods(getAllFoods());
            setLoading(false);
            window.addEventListener('scroll', debounce(handleScroll, 250));
        }, 250);
        return () => { window.removeEventListener('scroll', debounce(handleScroll, 250)); };
    }, []);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setFoods(foods => [...foods, ...getAllFoods()]);
                setLoading(false);
            }, 250);
        }
    }, [loading]);

    const handleScroll = () => {
        if (
            document.body.scrollHeight - 300 <
            window.scrollY + window.innerHeight
        ) {
            setLoading(true);
        }
    };

    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return function (...args: unknown[]) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    return <div className='max-page-content'>
        <h1 className='recipe-list-view-title'>Recipes</h1>
        <div className='recipe-list-view-filter-container'>
            <Card sx={{ borderRadius: '.75rem', backgroundColor: 'var(--card-color)', padding: '1rem' }}>
                <TextField
                    label='Recipe'
                    size='small'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setRecipeFilter(event.target.value);
                    }}
                />
                <span className='recipe-list-view-food-type-selector-container'>
                    <FoodTypeChipSelector chipsChanged={setSelectedFoodTypes} />
                </span>
            </Card>
        </div>
        <RecipeListDisplay
            foods={foods
                .filter((food: Food) => food.title.toLowerCase().includes(debouncedRecipeFilter.toLowerCase()))
                .filter((food: Food) => {
                    if (!selectedFoodTypes.length) return true;
                    for (let i = 0; i < selectedFoodTypes.length; i++) {
                        if (!food.foodTypes.includes(selectedFoodTypes[i])) return false;
                    }
                    return true;
                })
            }
            loading={loading}
        />
    </div>;
};

export default RecipeListView;