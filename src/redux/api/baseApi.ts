import { createApi } from "@reduxjs/toolkit/query/react";
import { mockBaseQuery } from "./mockBackend";

// Backend is offline: all endpoints are served by the in-memory mock.
// To reconnect, swap mockBaseQuery back to fetchBaseQuery({ baseUrl, prepareHeaders }).
export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Property", "Inquiry"],
  baseQuery: mockBaseQuery,
  endpoints: () => ({}),
});
