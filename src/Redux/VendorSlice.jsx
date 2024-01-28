import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendor: null,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    vendorDetails: (state, action) => {
      state.vendor = action.payload;
    },
    logoutDetails: (state) => {
      state.vendor = null;
    },
    updateVendorImage: (state, action) => {
      if (state.vendor) {
        state.vendor.image = action.payload;
      }
    },
  },
});

export default vendorSlice.reducer;
export const { vendorDetails, logoutDetails, updateVendorImage } =
  vendorSlice.actions;
