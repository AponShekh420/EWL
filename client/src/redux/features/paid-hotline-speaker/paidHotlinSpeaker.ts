import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  speakerId: "",
  speciality: "",
  gender: "",
  avatar: null,
  description: "",
  existingAvatar: "",
  deletedImage: "",
};

export const paidHotlineSpeakerFormSlice = createSlice({
  name: "paid-hotline-speaker-form",
  initialState,
  reducers: {
    addPaidHotlineField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetPaidHotlineFields: () => {
      return initialState;
    },
    deleteExistingAvatar: (
      state,
      action: { type: string; payload: string },
    ) => {
      if (!state.existingAvatar) {
        return;
      }
      state.existingAvatar = "";
      state.deletedImage = action.payload;
    },
  },
});

export const {
  addPaidHotlineField,
  resetPaidHotlineFields,
  deleteExistingAvatar,
} = paidHotlineSpeakerFormSlice.actions;

export default paidHotlineSpeakerFormSlice.reducer;
