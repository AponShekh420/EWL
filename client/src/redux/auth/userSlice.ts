import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  loading: true,
  notify: null,
};

export type UserState = typeof initialState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false
    },
    logout: (state) => {
      state.userInfo = null;
      state.loading = false
    },
    setNotify: (state, action) => {
      state.notify = action.payload;
    }
  },
});

export const { setCredentials, logout, setNotify } = userSlice.actions;

export default userSlice.reducer;
