import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartModalShow: false,
};
export type CartFormState = typeof initialState;
export const cartFormSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCartFields: () => {
      return initialState;
    },
  },
});

export const { addToCart, resetCartFields } = cartFormSlice.actions;

export default cartFormSlice.reducer;
