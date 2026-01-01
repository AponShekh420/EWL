import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cpassword: "",
  avatar: null,
  gender: "",
  isOrthodoxJew: "",
  maritalStatus: "",
  keepsMitzvos: "",
  chafifaDuration: "",
  chickenSoupInDairySink: "",
};
export type RegisterFormState = typeof initialState;
export const registerFormSlice = createSlice({
  name: "user-form",
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

export const { addUserField, resetUserFields } = registerFormSlice.actions;

export default registerFormSlice.reducer;
