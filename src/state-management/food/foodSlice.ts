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
    toggleAvailableState: (state, action: PayloadAction<number>) => {
      let index = state.data.findIndex((el) => el.id === action.payload);
      state.data[index].available = !state.data[index].available;
    },
    setFoodList: (state, action: PayloadAction<FoodFormat[]>) => {
      state.data = action.payload;
    },
  },
});

export const { toggleAvailableState, setFoodList } = foodSlice.actions;

export default foodSlice.reducer;
