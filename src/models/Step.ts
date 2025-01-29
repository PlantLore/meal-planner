import { Ingredient } from "./Ingredient";

export class Step {
    id: number = 0;
    ordinal: number = 0;
    text: string = '';
    ingredients: Ingredient[] = [];
}