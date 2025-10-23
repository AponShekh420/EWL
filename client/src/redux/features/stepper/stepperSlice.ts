import { createSlice } from "@reduxjs/toolkit";

export interface StepperType {
  step: number;
}

const initialState: StepperType = {
  step: 1,
};

export const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    activeStep: (state, action: { payload: number }) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetStep: (state) => {
      state.step = 1;
    },
  },
});

export const { activeStep, nextStep, prevStep, resetStep } =
  stepperSlice.actions;

export default stepperSlice.reducer;
