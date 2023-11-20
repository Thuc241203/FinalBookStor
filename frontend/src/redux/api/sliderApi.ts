import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../../utils/pause";

const sliderApi = createApi({
  reducerPath: "slider",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchFn: async (...arg) => {
      await pause(1500);
      return await fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    createSlider: builder.mutation({
      query: (slider) => ({
        url: "/create-slider",
        method: "POST",
        body: slider,
      }),
    }),

    getAllSlider: builder.query<any[], void>({
      query: () => ({
        url: `/get-slider`,
      }),
    }),
  }),
});
export const { useCreateSliderMutation, useGetAllSliderQuery } = sliderApi;
export const sliderReducer = sliderApi.reducer;
export default sliderApi;
