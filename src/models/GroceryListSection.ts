import { GroceryListItem } from "./GroceryListItem";
import { GrocerySection } from "./GrocerySection";

export class GroceryListSection {
    id: number = 0;
    grocerySection: GrocerySection = GrocerySection.OTHER;
    groceries: GroceryListItem[] = [];
}