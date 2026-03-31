import { ClassFormState } from "@/types/Class";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ClassFormState = {
  title: "",
  category: "",// Men | Women | Couples
  speaker: "",
  slug: "",
  status: "publish",
    //   2nd tab
  thumbnail: null,
  //   2nd tab
  existingThumbnail: "",
  existingAttachment: "",

  // end 4nd tab
  existingAudiosOne: [],
  deletedAudiosOne: [],
  audiosOne: null,

  existingAudiosTwo: [],
  deletedAudiosTwo: [],
  audiosTwo: null,

  existingVideosOne: [],
  deletedVideosOne: [],
  videosOne: null,

  existingVideosTwo: [],
  deletedVideosTwo: [],
  videosTwo: null,

  contentOne: "",
  contentTwo: "",

  // 3rd tab
  installmentMonths: "0",
  module: "0",
  price: "0",
  offline: false,
  externalLink: "",
  customMessage: "",
  attachment: null,
  checkoutPageMessage: "",
  metaTitle: "",
  metaDescription: "",
};

export const classFormSlice = createSlice({
  name: "class-form",
  initialState,
  reducers: {
    addClassField: (state, action) => {
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
      state.deletedAudiosOne?.push(action.payload);
      state.deletedAudiosTwo?.push(action.payload);
      state.deletedVideosOne?.push(action.payload);
      state.deletedVideosTwo?.push(action.payload);
    },
    deleteExistingAttachment: (
      state,
      action: { type: string; payload: string }
    ) => {
      if (!state.existingAttachment) {
        return;
      }
      state.existingAttachment = "";
      state.deletedAudiosOne?.push(action.payload);
      state.deletedAudiosTwo?.push(action.payload);
      state.deletedVideosOne?.push(action.payload);
      state.deletedVideosTwo?.push(action.payload);
    },
    deleteExistingAudiosOne: (
      state,
      action: { type: string; payload: string }
    ) => {
      if (!state.existingAudiosOne) {
        return;
      }
      state.existingAudiosOne = state?.existingAudiosOne.filter(
        (audio) => audio !== action.payload
      );

      state.deletedAudiosOne?.push(action.payload);
    },
    deleteExistingAudiosTwo: (
      state,
      action: { type: string; payload: string }
    ) => {
      if (!state.existingAudiosTwo) {
        return;
      }
      state.existingAudiosTwo = state?.existingAudiosTwo.filter(
        (audio) => audio !== action.payload
      );

      state.deletedAudiosTwo?.push(action.payload);
    },
    deleteExistingVideosOne: (
      state,
      action: { type: string; payload: string }
    ) => {
      if (!state.existingVideosOne) {
        return;
      }
      state.existingVideosOne = state?.existingVideosOne.filter(
        (audio) => audio !== action.payload
      );

      state.deletedVideosOne?.push(action.payload);
    },
    deleteExistingVideosTwo: (
      state,
      action: { type: string; payload: string }
    ) => {
      if (!state.existingVideosTwo) {
        return;
      }
      state.existingVideosTwo = state?.existingVideosTwo.filter(
        (audio) => audio !== action.payload
      );

      state.deletedVideosTwo?.push(action.payload);
    },
    resetClassFields: () => {
      return initialState;
    },
  },
});

export const { addClassField, deleteExistingThumb, deleteExistingAttachment, resetClassFields, deleteExistingAudiosOne, deleteExistingAudiosTwo, deleteExistingVideosOne, deleteExistingVideosTwo } = classFormSlice.actions;

export default classFormSlice.reducer;
