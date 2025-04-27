import { configureStore } from "@reduxjs/toolkit";
import groceriesReducer from './reduxSlices/groceriesSlice';

export const store = configureStore({
    reducer: {
        groceries: groceriesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;