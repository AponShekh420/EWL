import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  categoryId: "",
  thumbnail: null,
  description: "",
  existingThumbnail: "",
  deletedImage: "",
};

export const categoryFormSlice = createSlice({
  name: "category-form",
  initialState,
  reducers: {
    addCategoryField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCategoryFields: () => {
      return initialState;
    },
    deleteExistingThumb: (state, action: { type: string; payload: string }) => {
      if (!state.existingThumbnail) {
        return;
      }
      state.existingThumbnail = "";
      state.deletedImage = action.payload;
    },
  },
});

export const { addCategoryField, resetCategoryFields, deleteExistingThumb } =
  categoryFormSlice.actions;

export default categoryFormSlice.reducer;
