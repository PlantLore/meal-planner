import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Grocery } from "../models/Grocery";

export interface GroceriesState {
    groceries: Grocery[];
}

const initialState: GroceriesState = {
    groceries: []
};

export const groceriesSlice = createSlice({
    name: 'groceries',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Grocery[]>) => {
            state.groceries = action.payload;
        },
        add: (state, action: PayloadAction<Grocery>) => {
            state.groceries.push(action.payload);
        }
    }
});

export const { set, add } = groceriesSlice.actions;

export default groceriesSlice.reducer;