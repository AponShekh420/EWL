import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  cpassword: "",
  gender: "",
  avatar: null,
  orthodoxJew: "",
  marriedOrEverMarried: "",
  keepShabbosKashrusTaharasHamishpacha: "",
  mikvahExperience: "",
  hotChickenSoup: "",
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
