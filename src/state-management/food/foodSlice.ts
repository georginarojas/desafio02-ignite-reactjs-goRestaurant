import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodFormat } from "../../types";

interface FoodState {
  data: FoodFormat[];
}

const initialState: FoodState = {
  data: [],
};

export const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<number>) => {
      let index = state.data.findIndex((el) => el.id === action.payload);
      state.data[index].available = !state.data[index].available;
    },
    setFoodList: (state, action: PayloadAction<FoodFormat[]>) => {
      state.data = action.payload;
    },
    removeFood: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((food) => food.id !== action.payload)
    }
  },
});

export const { changeStatus, setFoodList, removeFood } = foodSlice.actions;

export default foodSlice.reducer;
