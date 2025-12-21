import categoryFormReducer from "@/redux/features/category/categoryFormSlice";
import courseFormReducer from "@/redux/features/course/courseFormSlice";
import productFormReducer from "@/redux/features/product/productFormSlice";
import sidebarReducer from "@/redux/features/sidebar/sidebarSlice";
import stepperReducer from "@/redux/features/stepper/stepperSlice";
import userFormReducer from "@/redux/features/user/userFormSlice";
import registerFormReducer from "@/redux/auth/registerFormSlice";
import loginFormReducer from "@/redux/auth/loginFormSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    stepper: stepperReducer,
    productForm: productFormReducer,
    categoryForm: categoryFormReducer,
    courseForm: courseFormReducer,
    userForm: userFormReducer,
    registerFrom: registerFormReducer,
    loginFrom: loginFormReducer,
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
