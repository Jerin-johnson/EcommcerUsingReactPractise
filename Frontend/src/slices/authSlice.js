
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,  
  isAuthenticated: !!localStorage.getItem("user"),
};


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state,action){
            state.user = action.payload;
            state.isAuthenticated = true;
            // Save to localStorage so it persists after refresh
              localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state){
            state.user = null,
            state.isAuthenticated = false;

            // Clear from localStorage
           localStorage.removeItem("user");
        }
    }
})


export const {setUser,logout} =authSlice.actions;

export default authSlice.reducer;

