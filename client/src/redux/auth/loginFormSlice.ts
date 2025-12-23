import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};
export type UserFormState = typeof initialState;
export const loginFormSlice = createSlice({
  name: "login-form",
  initialState,
  reducers: {
    addUserField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUserFields: () => {
      return initialState;
    },
  },
});

export const { addUserField, resetUserFields } = loginFormSlice.actions;

export default loginFormSlice.reducer;
