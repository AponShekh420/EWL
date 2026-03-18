import loginFormReducer from "@/redux/auth/loginFormSlice";
import registerFormReducer from "@/redux/auth/registerFormSlice";
import userSlice from "@/redux/auth/userSlice";
import cartSlice from "@/redux/features/cart/cartSlice";
import categoryFormReducer from "@/redux/features/category/categoryFormSlice";
import courseFormReducer from "@/redux/features/course/courseFormSlice";
import paidHotlineSpeakerReducer from "@/redux/features/paid-hotline-speaker/paidHotlinSpeaker";
import productFormReducer from "@/redux/features/product/productFormSlice";
import shippingFormReducer from "@/redux/features/shipping/shippingFormSlice";
import sidebarReducer from "@/redux/features/sidebar/sidebarSlice";
import stepperReducer from "@/redux/features/stepper/stepperSlice";
import CourseStepperReducer from "@/redux/features/stepper/courseStepperSlice";
import userFormReducer from "@/redux/features/user/userFormSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    stepper: stepperReducer,
    courseStepper: CourseStepperReducer,
    productForm: productFormReducer,
    categoryForm: categoryFormReducer,
    shippingForm: shippingFormReducer,
    courseForm: courseFormReducer,
    userForm: userFormReducer,
    registerFrom: registerFormReducer,
    loginFrom: loginFormReducer,
    user: userSlice,
    cart: cartSlice,
    paidHotlineSpeaker: paidHotlineSpeakerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   // Ignore these action types
      //   ignoredActions: ["your/action/type"],
      //   // Ignore these field paths in all actions
      //   ignoredActionPaths: ["meta.arg", "payload.timestamp"],
      //   // Ignore these paths in the state
      //   ignoredPaths: ["items.dates"],
      // },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
