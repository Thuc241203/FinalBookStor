import { createSlice } from "@reduxjs/toolkit";
const toggleDrawerSlice = createSlice({
  name: 'toggleDrawer',
  initialState: {open:false},
  reducers:{
    setIsOpenToggleDrawer: (state,action)=>{
      state.open = action.payload
    }
  }
})
export const {setIsOpenToggleDrawer} = toggleDrawerSlice.actions;
export const toggleDrawerReducer = toggleDrawerSlice.reducer