import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
}

const UserSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        userDetails:(state,action)=>{
            state.user=action.payload
        },
        userLogout:(state)=>{
            state.user=null
        }
    }
})

export default UserSlice.reducer;
export const { userDetails, userLogout } = UserSlice.actions;