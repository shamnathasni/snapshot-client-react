import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendor:null
}

const vendorSlice = createSlice({
    name:"vendor",
    initialState,
    reducers:{
        vendorDetails:(state,action)=>{
            state.vendor=action.payload
        },
        logoutDetails:(state)=>{
            state.vendor=null
        }
    }
})

export default vendorSlice.reducer
export const { vendorDetails, logoutDetails } = vendorSlice.actions