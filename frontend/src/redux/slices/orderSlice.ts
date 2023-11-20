import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: "",
    deliveryMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    user: "",
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
  },
  reducers: {
    addItemsCart: (state, action) => {
      state.orderItems = action.payload;
    },
  },
});
export const { addItemsCart } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
