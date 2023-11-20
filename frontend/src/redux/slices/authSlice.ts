import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "Authentication",
  initialState: { isAuth: false,user: null,token: null },
  reducers: {
    isAuth: (state) => {
      state.isAuth = true;
    },
    logout: (state)=>{
      state.isAuth = false,
      state.token = null,
      state.user = null
    },
    setUser: (state,action)=>{
      state.user = action.payload
    },
    setToken: (state,action)=>{
      state.token = action.payload
    },
  },
});
export const {isAuth,logout,setToken,setUser} = authSlice.actions;
export const authSliceReducer = authSlice.reducer;