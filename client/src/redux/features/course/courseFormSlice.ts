import { CourseFormState } from "@/types/Course";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CourseFormState = {
  id: "",
  title: "",
  category: "",// Men | Women | Couples
  lectures: "",
  time: "",
  DurationNumber: 0,
  DurationType: "",
  date: "",
  aboutTab: "",
  overviewTab: "",
  courseTopicsTab: "",
  speakerProfileTab: "",
  FAQsTab: "",
  testimonialsTab: "",
  moreInfoTab: "",
  slug: "",
  thumbnail: null,
  students: 0,
  regularPrice: 0,
  salePrice: 0,
  offline: false,
  speaker: "",
  status: "",
  ExternalLink: "",
  customMessage: "",
  attachment: null,
  checkoutPageMessage: "",
  metaData: "",
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
    resetCourseFields: () => {
      return initialState;
    },
  },
});

export const { addCourseField, resetCourseFields } = courseFormSlice.actions;

export default courseFormSlice.reducer;
