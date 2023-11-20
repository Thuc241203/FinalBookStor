import { pause } from "../../utils/pause";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../interfaces/products";
import queryString from "query-string";
import { getToken, parseJwt } from "../../config/getToken";
import { notification } from "antd";
const productApi = createApi({
  reducerPath: "product",
  tagTypes: ["Product"],
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
          notification.warning({
            message: "Token đã hết hạn vui lòng đăng nhập lại",
          });
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
    getProducts: builder.query<
      IProduct[],
      {
        _page?: number | string;
        _limit?: number | string;
        _category?: number | string;
        _sort?: string;
        _order?: string;
        _search?: string;
        _filterField?: string;
        _filterValue?: string;
      }
    >({
      query: (args) => {
        const {
          _page,
          _limit,
          _sort,
          _order,
          _search,
          _category,
          _filterField,
          _filterValue,
        } = args;
        const queryParams = {
          _page,
          _limit,
          _sort,
          _order,
          _search,
          _category,
          _filterField,
          _filterValue,
        } as any;
        Object.keys(queryParams).forEach((key: any) => {
          if (queryParams[key] === undefined || queryParams[key] === null) {
            delete queryParams[key];
          }
        });
        const queryUrl = queryString.stringify(queryParams);
        return `/products?${queryUrl ? `${queryUrl}` : ""}`;
      },
      providesTags: ["Product"],
    }),
    getProductById: builder.query<IProduct, number | string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    removeProduct: builder.mutation<IProduct, number | string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useAddProductMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useRemoveProductMutation,
  useUpdateProductMutation,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
