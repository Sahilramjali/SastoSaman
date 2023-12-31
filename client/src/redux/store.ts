
import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from './userSlice';
import cartSliceReducer from './cartSlice';
export const store = configureStore({
    reducer: {
    user:userSliceReducer,
    cart:cartSliceReducer,
    },
  })
  


export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch