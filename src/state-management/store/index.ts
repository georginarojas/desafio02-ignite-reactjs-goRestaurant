import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "../food/foodSlice";

const store = configureStore({
  reducer: {
    foods: foodsReducer,
  },
});
export default  store

export type RootState = ReturnType<typeof store.getState>
