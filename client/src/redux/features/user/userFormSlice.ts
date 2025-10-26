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
export type UserFormState = typeof initialState;
export const userFormSlice = createSlice({
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

export const { addUserField, resetUserFields } = userFormSlice.actions;

export default userFormSlice.reducer;
