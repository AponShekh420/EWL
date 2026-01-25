import { CourseFormState } from "@/types/Course";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CourseFormState = {
  id: "",
  title: "",
  category: "",// Men | Women | Couples
  lectures: "",
  time: "",
  speaker: "",
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
    //   2nd tab
  thumbnail: null,
  //   2nd tab
  existingThumbnail: "",
  existingAttachment: "",
  existingImages: [],
  deletedImages: [],
  // end 2nd tab
  students: 0,

  // 3rd tab
  regularPrice: 0,
  salePrice: 0,
  limitOneItemPerOrder: false,
  offline: false,
  status: "",
  ExternalLink: "",
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
    resetCourseFields: () => {
      return initialState;
    },
  },
});

export const { addCourseField, resetCourseFields } = courseFormSlice.actions;

export default courseFormSlice.reducer;
