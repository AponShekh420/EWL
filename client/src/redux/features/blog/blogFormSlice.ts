import { BlogFormState } from "@/types/Blog";
import { createSlice } from "@reduxjs/toolkit";
export const stepBlogFields = {
  step1: ["title", "category", "tags", "description"],
  step2: ["thumbnail"],
  step3: ["metaTitle", "metaDescription"],
};
const initialState: BlogFormState = {
  title: "",
  category: "",
  slug: "",
  tags: "",
  description: "",
  //   2nd tab
  thumbnail: null,
  //   2nd tab
  existingThumbnail: "",
  deletedImages: [],
  
  metaTitle: "",
  metaDescription: "",
};

export const blogFormSlice = createSlice({
  name: "blog-form",
  initialState,
  reducers: {
    addBlogField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    deleteExistingThumb: (state, action: { type: string; payload: string }) => {
      if (!state.existingThumbnail) {
        return;
      }
      state.existingThumbnail = "";
      state.deletedImages?.push(action.payload);
    },
    
    resetBlogFields: () => {
      return initialState;
    },
  },
});

export const {
  addBlogField,
  resetBlogFields,
  deleteExistingThumb,
} = blogFormSlice.actions;

export default blogFormSlice.reducer;
