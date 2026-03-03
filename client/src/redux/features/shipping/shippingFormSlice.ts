import { createSlice } from "@reduxjs/toolkit";
type ShippingMethodType = {
  methodName: string;
  cost: number;
};
const initialState = {
  shippingId: "",
  zoneName: "",
  region: "",
  shippingMethods: [] as ShippingMethodType[],
};

export const shippingFormSlice = createSlice({
  name: "shipping-form",
  initialState,
  reducers: {
    addShippingField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addShippingMethod: (state, action) => {
      const { checked, methodName, cost } = action.payload;
      if (checked) {
        state.shippingMethods.push({ methodName, cost });
      } else {
        state.shippingMethods = state.shippingMethods.filter(
          (method) => method.methodName !== methodName,
        );
      }
    },
    resetShippingFields: () => {
      return initialState;
    },
  },
});

export const { addShippingField, addShippingMethod, resetShippingFields } =
  shippingFormSlice.actions;

export default shippingFormSlice.reducer;
