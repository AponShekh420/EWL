import productFormReducer from "@/redux/features/product/productFormSlice";
import courseFormReducer from "@/redux/features/course/courseFormSlice";
import sidebarReducer from "@/redux/features/sidebar/sidebarSlice";
import stepperReducer from "@/redux/features/stepper/stepperSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    stepper: stepperReducer,
    productForm: productFormReducer,
    courseForm: courseFormReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
