import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  categoryId: "",
  thumbnail: null,
  description: "",
  existingThumbnail: "",
  deletedImage: "",
};

export const ResourceCategoryFormSlice = createSlice({
  name: "resouce-category-form",
  initialState,
  reducers: {
    addResourceCategoryField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetResourceCategoryFields: () => {
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

export const {
  addResourceCategoryField,
  resetResourceCategoryFields,
  deleteExistingThumb,
} = ResourceCategoryFormSlice.actions;

export default ResourceCategoryFormSlice.reducer;
