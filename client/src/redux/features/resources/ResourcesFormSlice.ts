import { ResourcesFormState } from "@/types/Resources";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ResourcesFormState = {
  title: "",
  link: "",
  category: "",
  slug: "",
  description: "",
  //   2nd tab
  thumbnail: null,
  //   2nd tab
  existingThumbnail: "",
  deletedImages: [],
};

export const resourcesFormSlice = createSlice({
  name: "resources-form",
  initialState,
  reducers: {
    addResourcesField: (state, action) => {
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

    resetResourcesFields: () => {
      return initialState;
    },
  },
});

export const { addResourcesField, resetResourcesFields, deleteExistingThumb } =
  resourcesFormSlice.actions;

export default resourcesFormSlice.reducer;
