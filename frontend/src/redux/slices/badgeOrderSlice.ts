import { createSlice } from "@reduxjs/toolkit";

const badgeSlice = createSlice({
  name: "badge",
  initialState: { allOrder: 0, delivering: 0, delivered: 0, processing: 0},
  reducers:{
    setAllOrder: (state,actions)=>{
      state.allOrder = actions.payload
    },
    setDelivering: (state,actions)=>{
      state.delivering = actions.payload
    },
    setDelivered: (state,actions)=>{
      state.delivered = actions.payload
    },
    setProcessing: (state,actions)=>{
      state.processing = actions.payload
    },
  }
});
export const {setAllOrder,setDelivered,setDelivering,setProcessing} = badgeSlice.actions;
export const badgeReducer = badgeSlice.reducer