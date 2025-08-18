import { Grocery } from "./Grocery";
import { Recipe } from "./Recipe";

export class GroceryListItem {
    id: number = 0;
    grocery: Grocery = new Grocery();
    quantity: string = "";
    unit: string = "";
    checked: boolean = false;
    recipes?: Recipe[] = [];
}