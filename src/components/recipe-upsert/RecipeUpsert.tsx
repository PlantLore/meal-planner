import { Button, Card, Divider, InputAdornment, TextField } from '@mui/material';
import './RecipeUpsert.css';
import FoodTypeChipSelector from '../food-type-chip/food-type-chip-selector/FoodTypeChipSelector';
import { FoodType } from '../../models/FoodType';
import { FastfoodOutlined, LocalFireDepartmentOutlined } from '@mui/icons-material';
import IngredientListUpsert from './ingredient-list-upsert/IngredientListUpsert';
import DirectionsListUpsert from './directions-list-upsert/DirectionsListUpsert';
import { Food } from '../../models/Food';
import { Step } from '../../models/Step';
import { useState } from 'react';
import { Ingredient } from '../../models/Ingredient';
import { validateFraction } from '../../utilities/FractionUtils';
import { useNavigate } from 'react-router';

const RecipeUpsert = ({ initialFood, onSubmit }: { initialFood: Food, onSubmit: (updatedFood: Food) => void; }) => {
    const [food, setFood] = useState<Food>(initialFood);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [blurFields, setBlurFields] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (!validtate()) return;

        const newFood = { ...food, recipe: updateRecipeOrdinal(food.recipe) };
        onSubmit(newFood);
    };

    const validtate = (): boolean => {
        //validate title
        if (!food.title) return false;

        //validate type
        if (!food.foodTypes.length) return false;

        //validate calories
        if (food.calories < 0 || isNaN(food.calories)) return false;

        //validate servings
        if (food.servings < 1 || isNaN(food.servings)) return false;

        //validate ingredients
        if (!food.ingredients.length) return false;
        for (let i = 0; i < food.ingredients.length; i++) {
            if (!food.ingredients[i].name || !validateFraction(food.ingredients[i].quantity)) return false;
        }

        //validate directions
        for (let i = 0; i < food.recipe.length; i++) {
            if (!food.recipe[i].text) return false;
        }

        return true;
    };

    const updateRecipeOrdinal = (recipe: Step[]): Step[] => {
        return recipe.map((step: Step, index: number) => {
            step.ordinal = index + 1;
            return step;
        });
    };

    const handleFoodFieldChange = <K extends keyof Food>(value: Food[K], field: K) => {
        const newFood = { ...food };
        newFood[field] = value;
        setFood(newFood);
    };

    const handleFieldBlur = (field: string) => {
        if (blurFields.includes(field)) return;
        setBlurFields([...blurFields, field]);
    };

    return <form onSubmit={handleSubmit}>
        <Card className='recipe-upsert-card' raised={false} sx={{ borderRadius: '.75rem', backgroundColor: 'var(--card-color)' }}>
            <div className='recipe-upsert-card-title-container'>
                <TextField
                    size='small'
                    fullWidth
                    label='Recipe Name *'
                    defaultValue={initialFood.title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleFoodFieldChange(event.target.value, 'title'); }}
                    onBlur={() => { handleFieldBlur('title'); }}
                    error={(submitted || blurFields.includes('title')) && !food.title}
                />
                <div className={submitted && !food.foodTypes.length ? 'recipe-upsert-card-food-type-selector-container-error' : 'recipe-upsert-card-food-type-selector-container'}>
                    <FoodTypeChipSelector initialChips={food.foodTypes} chipsChanged={(foodTypes: FoodType[]) => { handleFoodFieldChange(foodTypes, 'foodTypes'); }} />
                </div>
                {submitted && !food.foodTypes.length ? <p className='error-helper-text'>Minimum One Recipe Type Required</p> : <></>}
            </div>

            <Divider variant='middle' />

            <div className='recipe-upsert-info-container'>
                <div className='recipe-upsert-ingredient-column'>
                    <div className='recipe-upsert-food-fact-container'>
                        <TextField
                            label='Calories *'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start' sx={(submitted || blurFields.includes('calories')) && (food.calories < 0 || isNaN(food.calories)) ? { color: 'rgb(211, 47, 47)' } : {}}>
                                            <LocalFireDepartmentOutlined />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            size='small'
                            sx={{ width: '8rem' }}
                            defaultValue={initialFood.calories}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleFoodFieldChange(event.target.value ? +event.target.value : -1, 'calories'); }}
                            onBlur={() => { handleFieldBlur('calories'); }}
                            error={(submitted || blurFields.includes('calories')) && (food.calories < 0 || isNaN(food.calories))}
                        />
                        <TextField
                            label='Servings *'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start' sx={(submitted || blurFields.includes('servings')) && (food.servings < 1 || isNaN(food.servings)) ? { color: 'rgb(211, 47, 47)' } : {}}>
                                            <FastfoodOutlined />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            size='small'
                            sx={{ width: '8rem' }}
                            defaultValue={initialFood.servings}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleFoodFieldChange(event.target.value ? +event.target.value : -1, 'servings'); }}
                            onBlur={() => { handleFieldBlur('servings'); }}
                            error={(submitted || blurFields.includes('servings')) && (food.servings < 1 || isNaN(food.servings))}
                        />
                    </div>
                    <h3>Ingredients</h3>
                    {submitted && !food.ingredients.length ? <p className='error-helper-text'>Minimum One Ingredient Required</p> : <></>}
                    <IngredientListUpsert submitted={submitted} initialIngredients={food.ingredients} onChange={(ingredients: Ingredient[]) => { handleFoodFieldChange(ingredients, 'ingredients'); }} />
                </div>
                <Divider variant='middle' orientation='vertical' flexItem />
                <div className='recipe-upsert-directions-column'>
                    <div className='recipe-upsert-image-container'>
                        <TextField
                            label='Image URL'
                            size='small'
                            fullWidth
                            defaultValue={food.image}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleFoodFieldChange(event.target.value, 'image'); }}
                        />
                    </div>
                    <div>
                        <ul className='no-bullets'><li><h3>Directions</h3></li></ul>
                        <DirectionsListUpsert submitted={submitted} initialSteps={food.recipe} onChange={(directions: Step[]) => { handleFoodFieldChange(directions, 'recipe'); }} />
                    </div>
                </div>
            </div>
        </Card>;
        <div className='recipe-upsert-submit-container'>
            <Button type='reset' color='error' variant='contained' onClick={() => { navigate(-1); }}>Cancel</Button>
            <Button type='submit' variant='contained'>Submit</Button>
        </div>
    </form>;
};

export default RecipeUpsert;