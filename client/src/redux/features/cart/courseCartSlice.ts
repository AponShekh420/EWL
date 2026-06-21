import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: '',
  createdAt: new Date(),
  totalPrice: 0,
  totalCourse: 1,
  modules: [],
  _id: 'temp-id', // Temporary ID, replace with actual if available
  items: [
    {
      price: 0,
      modulesPrice: 0,
      course: {} as never, // Replace with actual CourseType if available
      quantity: 0
    }
  ]
};
export type CourseCartFormState = typeof initialState;
export const courseCartFormSlice = createSlice({
  name: "course-cart",
  initialState,
  reducers: {
    addToCourseCart: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCourseCartFields: () => {
      return initialState;
    },
  },
});

export const { addToCourseCart, resetCourseCartFields } = courseCartFormSlice.actions;

export default courseCartFormSlice.reducer;
