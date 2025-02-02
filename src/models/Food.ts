import { FoodType } from "./FoodType";
import { Ingredient } from "./Ingredient";
import { Step } from "./Step";

export class Food {
  id: number = 0;
  title: string = "";
  recipe: Step[] = [];
  servings: number = 0;
  calories: number = 0;
  foodTypes: FoodType[] = [];
  ingredients: Ingredient[] = [];
  image: string = "";
}
