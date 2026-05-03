import { createSlice } from "@reduxjs/toolkit";


const orderErrors = {
  fullName: { msg: "" },
  email: { msg: "" },
  spouseName: { msg: "" },
  howDidYouHearAboutUs: { msg: "" },
  phoneNumber: { msg: "" },
  otherPhoneNumber: { msg: "" },

  country: { msg: "" },
  state: { msg: "" },
  city: { msg: "" },
  zip: { msg: "" },
  streetAddress: { msg: "" },
  apartment: { msg: "" },

  orderNotes: { msg: "" },
};


const initialState = {
  fullName: "",
  email: "",
  spouseName: "",
  howDidYouHearAboutUs: "",
  country: {
    label: "",
    value: ""
  },
  streetAddress: "",
  apartment: "",
  state: {
    label: "",
    value: ""
  },
  city: "",
  zipCode: "",
  phoneNumber: "",
  otherPhoneNumber: "",
  orderNotes: "",
  errors: orderErrors,
  loading: false
};
export type CheckoutFormState = typeof initialState;
export const courseCheckoutFormSlice = createSlice({
  name: "course-checkout-form",
  initialState,
  reducers: {
    addCourseCheckoutField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCourseCheckoutFields: () => {
      return initialState;
    },
  },
});

export const { addCourseCheckoutField, resetCourseCheckoutFields } =
  courseCheckoutFormSlice.actions;

export default courseCheckoutFormSlice.reducer;
