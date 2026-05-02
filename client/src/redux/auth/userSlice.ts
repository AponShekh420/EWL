import { createSlice } from "@reduxjs/toolkit";

interface User {
  avatar: string;
  bio: string;
  chafifaDuration: string;
  chickenSoupInDairySink: string;
  classes: string[];
  courses: string[];
  createdAt: string;
  email: string;
  firstName: string;
  gender: string;
  isOrthodoxJew: boolean;
  keepsMitzvos: boolean;
  lastName: string;
  maritalStatus: string;
  role: string;
  status: string;
  updatedAt: string;
  userId: string;
  userName: string;
  __v: number;
  _id: string;
}

interface intialStateProps {
  userInfo: null | User;
  loading: boolean,
  notify: unknown,
}

const initialState: intialStateProps = {
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
