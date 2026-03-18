import { CourseFormState } from "@/types/Course";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CourseFormState = {
  title: "",
  bio: "",
  headline: "",
  category: "",// Men | Women | Couples
  lectures: "",
  time: "",
  speaker: "",
  durationNumber: "0",
  durationType: "",
  date: "",
  aboutTab: "",
  overviewTab: "",
  courseTopicsTab: "",
  speakerProfileTab: "",
  FAQsTab: "",
  testimonialsTab: "",
  moreInfoTab: "",
  slug: "",
  status: "publish",
    //   2nd tab
  thumbnail: null,
  //   2nd tab
  existingThumbnail: "",
  existingAttachment: "",
  existingImages: [],
  deletedImages: [],
  // end 2nd tab

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

export const courseFormSlice = createSlice({
  name: "course-form",
  initialState,
  reducers: {
    addCourseField: (state, action) => {
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
    deleteExistingAttachment: (
      state,
      action: { type: string; payload: string }
    ) => {
      if (!state.existingAttachment) {
        return;
      }
      state.existingAttachment = "";
      state.deletedImages?.push(action.payload);
    },
    resetCourseFields: () => {
      return initialState;
    },
  },
});

export const { addCourseField, deleteExistingThumb, deleteExistingAttachment, resetCourseFields } = courseFormSlice.actions;

export default courseFormSlice.reducer;
