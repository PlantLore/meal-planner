import { FoodType } from "./FoodType";
import { Ingredient } from "./Ingredient";

export class Food {
  id: number = 0;
  title: string = "";
  recipie: string = "";
  servings: number = 0;
  calories: number = 0;
  foodTypes: FoodType[] = [];
  ingredient: Ingredient[] = [];
}
