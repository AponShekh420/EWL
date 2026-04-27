import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
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
  isDifferentBillingAddress: false,
  differentBillingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    spouseName: "",
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
  },
  shippingAndTaxDetails: {
    shipping: {
      usps: {
        boxUsed: "",
        finalWeightOz: 0,
        rates: [],
      },
      flatRate: 0,
      localPickup: 0,
      shippingClassRates: [{
        shippingCost: 0
      }],
      impossibleProducts: [],
    },
    tax: 0,
  },
  shipping: {
      methodName: "",
      cost: 0,
      boxUsed: "",
      finalWeightOz: 0,
      servicelevel: "",
  },
  errors: {}
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
