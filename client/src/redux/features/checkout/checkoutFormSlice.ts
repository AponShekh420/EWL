import { createSlice } from "@reduxjs/toolkit";


const orderErrors = {
  firstName: { msg: "" },
  lastName: { msg: "" },
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

  shipping: {
    methodName: { msg: "" },
    cost: { msg: "" },
    boxUsed: { msg: "" },
    finalWeightOz: { msg: "" },
    servicelevel: { msg: "" },
  },

  isDifferentBillingAddress: { msg: "" },

  differentBillingAddress: {
    firstName: { msg: "" },
    lastName: { msg: "" },
    email: { msg: "" },
    spouseName: { msg: "" },
    phoneNumber: { msg: "" },
    country: { msg: "" },
    state: { msg: "" },
    city: { msg: "" },
    zip: { msg: "" },
    streetAddress: { msg: "" },
  }
};


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
      shippingClassRates: [],
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
  errors: orderErrors,
  loading: false
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
