import { createSlice } from "@reduxjs/toolkit";

export interface SidebarStateType {
  isShowSidebar: boolean;
}

const initialState: SidebarStateType = {
  isShowSidebar: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isShowSidebar = !state.isShowSidebar;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
