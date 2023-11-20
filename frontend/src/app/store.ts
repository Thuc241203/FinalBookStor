import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productApi, { productReducer } from "../redux/api/productApi";
import authApi, { authReducer } from "../redux/api/auth";
import { authSliceReducer } from "../redux/slices/authSlice";
import categoriesApi, { categoriesReducer } from "../redux/api/categoriesApi";
import { cartReducer } from "../redux/slices/cartSlice";
import { orderReducer } from "../redux/slices/orderSlice";
import { paginationReducer } from "../redux/slices/paginationSlice";
import shoppingApi, { shoppingReducer } from "../redux/api/shoppingApi";
import feedbackApi, { feedbackReducer } from "../redux/api/feedbackApi";
import { feedbackSliceReducer } from "../redux/slices/feedbackSlice";
import { badgeReducer } from "../redux/slices/badgeOrderSlice";
import sliderApi, { sliderReducer } from "../redux/api/sliderApi";
import { timelineReducer } from "../redux/slices/timelineSlice";
import { toggleDrawerReducer } from "../redux/slices/toggleDrawerSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Authentication", "Cart", "Order"],
};
const rootReducer = combineReducers({
  [productApi.reducerPath]: productReducer,
  [authApi.reducerPath]: authReducer,
  [categoriesApi.reducerPath]: categoriesReducer,
  [shoppingApi.reducerPath]: shoppingReducer,
  [feedbackApi.reducerPath]: feedbackReducer,
  [sliderApi.reducerPath]: sliderReducer,
  Authentication: authSliceReducer,
  Cart: cartReducer,
  Order: orderReducer,
  Pagination: paginationReducer,
  FeedbackSlice: feedbackSliceReducer,
  BadgeSlice: badgeReducer,
  Timeline: timelineReducer,
  ToggleDrawer: toggleDrawerReducer,
});
const middleware = [
  productApi.middleware,
  authApi.middleware,
  categoriesApi.middleware,
  shoppingApi.middleware,
  feedbackApi.middleware,
  sliderApi.middleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default persistStore(store);
