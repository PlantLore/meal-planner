import { Food } from '../../models/Food';
import './RecipeListDisplay.css';
import FoodCard from '../food-card/FoodCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useMemo } from 'react';

const RecipeListDisplay = ({ foods }: { foods: Food[]; }) => {
    const ROOT_FONT_SIZE: number = +window.getComputedStyle(document.body).getPropertyValue('font-size').substring(0, window.getComputedStyle(document.body).getPropertyValue('font-size').length - 2);
    const breakpoints: { [key: number]: number; } = useMemo(() => {
        const tempBreakpoints: { [key: number]: number; } = {};
        const fourBP = ROOT_FONT_SIZE * 72;
        const threeBP = ROOT_FONT_SIZE * 55;
        const twoBP = ROOT_FONT_SIZE * 38;
        const oneBP = 0;

        tempBreakpoints[fourBP] = 4;
        tempBreakpoints[threeBP] = 3;
        tempBreakpoints[twoBP] = 2;
        tempBreakpoints[oneBP] = 1;
        return tempBreakpoints;
    }, [ROOT_FONT_SIZE]);

    return <div className='recipe-list-display-container'>
        <div className='recipe-list-display-food-card-column-container'>
            {foods.length ?
                <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
                    <Masonry containerTag='masonry-container-tag'>
                        {foods.map((food: Food, index: number) => <div key={index} className='recipe-list-display-food-card-container'><FoodCard food={food} /></div>)}
                    </Masonry>
                </ResponsiveMasonry> :
                <i>No Recipes to Display.</i>
            }
        </div>
    </div>;
};

export default RecipeListDisplay;