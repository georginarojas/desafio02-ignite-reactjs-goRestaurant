import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "../food/foodSlice";

export default configureStore({
  reducer: {
    foods: foodsReducer,
  },
});
