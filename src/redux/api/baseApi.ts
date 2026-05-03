import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Property", "Inquiry"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jlsxgq9c-8000.inc1.devtunnels.ms",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
