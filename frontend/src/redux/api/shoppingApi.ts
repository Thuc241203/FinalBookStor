import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../../utils/pause";
import { getToken, parseJwt } from "../../config/getToken";

const shoppingApi = createApi({
  reducerPath: "shopping",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (!token) {
        console.log("token không tồn tại");
      } else {
        const decotedToken = parseJwt(token);
        const currentTimestamp = Date.now() / 1000;
        if (decotedToken.exp && decotedToken.exp < currentTimestamp) {
          throw new Error("Token đã hết hạn vui lòng đăng nhập lại");
        } else {
          headers.set("authorization", `Bearer ${token}`);
          return headers;
        }
      }
    },
    fetchFn: async (...arg) => {
      await pause(1500);
      return await fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getShopping: builder.query<any[], void>({
      query: () => "/get-order",
    }),
    getByIdShopping: builder.query<any, number | string>({
      query: (id) => `/get-order/${id}`,
    }),
    createShopping: builder.mutation({
      query: (shopping) => ({
        url: "/create-order",
        method: "POST",
        body: shopping,
      }),
    }),
    updateShopping: builder.mutation({
      query: (shopping) => ({
        url: `/update-order/${shopping._id}`,
        method: "PUT",
        body: shopping,
      }),
    }),
    removeShopping: builder.mutation({
      query: (_id) => ({
        url: `/remove-order/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateShoppingMutation,
  useGetShoppingQuery,
  useUpdateShoppingMutation,
  useGetByIdShoppingQuery,
  useRemoveShoppingMutation,
} = shoppingApi;
export const shoppingReducer = shoppingApi.reducer;
export default shoppingApi;
