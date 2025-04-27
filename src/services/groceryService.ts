import { Grocery } from "../models/Grocery";
import { mockGroceries, mockGroceryList } from "./mockData";

export const getAllGroceries = (): Grocery[] => {
    return mockGroceries;
};

export const upsertGrocery = (grocery: Grocery) => {
    return grocery;
};

export const getGroceryListById = (id: number) => {
    return mockGroceryList;
};