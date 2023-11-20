import { createSlice } from "@reduxjs/toolkit";
const timelineSlice = createSlice({
  name: 'timeline',
  initialState: {idOrder: "",isModal:false},
  reducers:{
    setIdOrderTimeline: (state,action)=>{
      state.idOrder = action.payload
    },
    setisModalTimeline: (state,action)=>{
      state.isModal = action.payload
    },
  }
})
export const {setIdOrderTimeline,setisModalTimeline} = timelineSlice.actions;
export const timelineReducer = timelineSlice.reducer