import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "Cart",
  initialState: { items: [] } as any,
  reducers: {
    afterAddItemCart: (state,action)=>{
      state.items = action.payload
    },
    addItemCart: (state, action)  => {
      const productCart:any = action.payload;
      const exitProductIndex = state.items.findIndex(
        (item:any) => item._id === productCart._id
      );
      if (exitProductIndex == -1) {
        state.items.push(productCart);
      } else {
        state.items[exitProductIndex].quantity++;
      }
    },
    removeItemCart: (state, action) => {
      state.items = state.items.filter((item:any) => item._id != action.payload);
    },
    increase: (state, action) => {
      state.items.find((item:any) => item._id === action.payload).quantity++;
    },
    decrease: (state, action) => {
      const productFound:any = state.items.find(
        (item:any) => item._id === action.payload
      );
      productFound.quantity--;
      if (productFound.quantity < 1) {
        productFound.quantity = 1;
      }
    },
  },
});
export const { addItemCart, removeItemCart, decrease, increase,afterAddItemCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
