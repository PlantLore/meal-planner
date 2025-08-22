import { Card, Divider, IconButton, Tooltip } from "@mui/material";
import { Recipe } from "../../models/Recipe";
import "./ExpandedRecipeCard.css";
import CloseIcon from '@mui/icons-material/Close';
import RecipeTypeChip from "../recipe-type-chip/RecipeTypeChip";
import RecipeFactArray from "../recipe-card/recipe-fact-array/RecipeFactArray";
import { Edit, ZoomOutMap } from "@mui/icons-material";
import { Link } from "react-router";

const ExpandedRecipeCard = ({ recipe, handleClose }: { recipe: Recipe; handleClose?: () => void; }) => {
    return <Card onMouseDown={(event) => { event.stopPropagation(); }} className={((): string => recipe.steps.length ? "expanded-recipe-card" : "expanded-recipe-card-small")()} raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)" }}>
        <div className="expanded-recipe-card-header-container">
            <div className={((): string => recipe.image ? "expanded-recipe-card-title-container" : "expanded-recipe-card-title-container-no-image")()}>
                <h2>{recipe.title}</h2>
                {recipe.recipeTypes.map((recipeType, index) => <RecipeTypeChip key={index} recipeType={recipeType} />)}
            </div>
            <div className="expanded-recipe-card-action-button-container">
                <Link to={`/recipes/${recipe.id}`} className='no-link-style'>
                    <Tooltip title="Open Recipe">
                        <IconButton
                            sx={(theme) => ({
                                color: theme.palette.grey[500],
                            })}
                        >
                            <ZoomOutMap />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Link to={`/recipes/edit/${recipe.id}`} className='no-link-style'>
                    <IconButton
                        sx={(theme) => ({
                            color: theme.palette.grey[500],
                        })}
                    >
                        <Edit />
                    </IconButton>
                </Link>
                {
                    handleClose ?
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={(theme) => ({
                                color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon />
                        </IconButton> :
                        <></>
                }
            </div>
        </div>
        {recipe.image ?
            <img className={((): string => recipe.steps.length ? "expanded-recipe-card-image" : "expanded-recipe-card-image-small")()} src={recipe.image} alt="completed recipe" /> :
            <Divider variant="middle" />
        }
        <div className="expanded-recipe-card-info-container">
            <div className="expanded-recipe-card-ingredient-column">
                <RecipeFactArray recipe={recipe} />
                <h3>Ingredients</h3>
                {recipe.ingredients.map((ingredient, index) => <p className="ingredient-list-item" key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.grocery.name}</p>)}
            </div>
            {
                recipe.steps.length ?
                    <>
                        <Divider variant="middle" orientation="vertical" flexItem />
                        <div className="expanded-recipe-card-directions-column">
                            <ul className="no-bullets"><li><h3>Directions</h3></li></ul>
                            <ol>
                                {recipe.steps.sort((a, b) => a.ordinal - b.ordinal).map((step, index) => <li key={index}>
                                    {step.text}
                                </li>)}
                            </ol>
                        </div>
                    </> :
                    <></>
            }

        </div>
    </Card>;
};

export default ExpandedRecipeCard;