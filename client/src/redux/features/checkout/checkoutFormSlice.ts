import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  spouseName: "",
  howDidYouHearAboutUs: "",
  country: "",
  streetAddress: "",
  apartment: "",
  state: "",
  city: "",
  zipCode: "",
  phoneNumber: "",
  otherPhoneNumber: "",
  orderNotes: "",
  isDifferentBillingAddress: false,
  differentBillingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    spouseName: "",
    country: "",
    streetAddress: "",
    apartment: "",
    state: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    otherPhoneNumber: "",
  },
};
export type CheckoutFormState = typeof initialState;
export const checkoutFormSlice = createSlice({
  name: "checkout-form",
  initialState,
  reducers: {
    addCheckoutField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCheckoutFields: () => {
      return initialState;
    },
  },
});

export const { addCheckoutField, resetCheckoutFields } =
  checkoutFormSlice.actions;

export default checkoutFormSlice.reducer;
