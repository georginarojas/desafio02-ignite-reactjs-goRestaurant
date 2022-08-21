import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodFormat } from "../../types";

interface FoodState {
  data: FoodFormat[];
}

const initialState: FoodState = {
  data: [
    {
    "image": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png",
    "name": "Camarão empanado",
    "price": 69.69,
    "description": "Comida Bahiana",
    "available": true,
    "id": 0
  }],
};

export const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    toggleAvailableState: (state, action: PayloadAction<number>) => {
      let index = state.data.findIndex((el) => el.id === action.payload);
      state.data[index].available = !state.data[index].available;
    },
  },
});

export const { toggleAvailableState } = foodSlice.actions;

export default foodSlice.reducer;
