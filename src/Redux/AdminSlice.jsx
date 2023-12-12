import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginDetails: (state, action) => {
      state.admin = action.payload;
    },
    logoutDetails: (state) => {
      state.admin = "";
    },
  },
});

export default adminSlice.reducer;
export const { loginDetails } = adminSlice.actions;
