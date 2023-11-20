import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../../utils/pause";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchFn: async (...arg) => {
      await pause(1500);
      return await fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signup) => ({
        url: "/signup",
        method: "POST",
        body: signup,
      }),
    }),
    signin: builder.mutation({
      query: (signin) => ({
        url: "/signin",
        method: "POST",
        body: signin,
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/user/update/${user._id}`,
        method: "PUT",
        body: user,
      }),
    }),
    getAllUser: builder.query<any, void>({
      query: () => ({
        url: `/user/profile`,
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/profile/${id}`,
      }),
    }),
  }),
});
export const {
  useSigninMutation,
  useSignupMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useGetAllUserQuery,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
