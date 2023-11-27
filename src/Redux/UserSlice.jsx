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
        },
        updateUserImage: (state, action) => {
            // Update the user's image in the state
            if (state.user) {
              state.user.image = action.payload;
            }
    }
}
})

export default UserSlice.reducer;
export const { userDetails, userLogout, updateUserImage } = UserSlice.actions;