import { createSlice } from "@reduxjs/toolkit";
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: { idOrder: null },
  reducers: {
    setIdOrder: (state,actions) => {
      state.idOrder = actions.payload
    }
  },
});
export const {setIdOrder} = feedbackSlice.actions;
export const feedbackSliceReducer = feedbackSlice.reducer;