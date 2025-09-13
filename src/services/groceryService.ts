import { Grocery } from "../models/Grocery";
import { mockGroceries, mockGroceryList } from "./mockData";

export const getAllGroceries = (): Grocery[] => {
    return mockGroceries;
};

export const upsertGrocery = (grocery: Grocery) => {
    return grocery;
};

export const getGroceryListByMealPlanId = (id: number) => {
    if (id === 2) return { ...mockGroceryList, id: id, creatorEmail: "notMe@gmail.com" };
    return mockGroceryList;
};