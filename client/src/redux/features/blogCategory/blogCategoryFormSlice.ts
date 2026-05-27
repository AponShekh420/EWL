import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  categoryId: "",
  thumbnail: null,
  description: "",
  existingThumbnail: "",
  deletedImage: "",
};

export const BlogCategoryFormSlice = createSlice({
  name: "blog-category-form",
  initialState,
  reducers: {
    addBlogCategoryField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetBlogCategoryFields: () => {
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

export const { addBlogCategoryField, resetBlogCategoryFields, deleteExistingThumb } =
  BlogCategoryFormSlice.actions;

export default BlogCategoryFormSlice.reducer;
