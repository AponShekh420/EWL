import { createSlice } from "@reduxjs/toolkit";

export interface StepperType {
  step: number;
}

const initialState: StepperType = {
  step: 1,
};

export const CourseStepperSlice = createSlice({
  name: "courseStepper",
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
  CourseStepperSlice.actions;

export default CourseStepperSlice.reducer;
