import { Grocery } from "./Grocery";

export class Ingredient {
  id: number = 0;
  grocery: Grocery = new Grocery();
  quantity: string = "";
  unit: string = "";
}
