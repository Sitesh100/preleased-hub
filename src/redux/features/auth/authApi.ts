import { baseApi } from "@/src/redux/api/baseApi";

// ── Request Types ─────────────────────────────────────────────────────────────

export interface IRegisterRequest {
  user_name: string;
  email: string;
  phone_no: string;
  password: string;
  role: number;
}

export interface ILoginRequest {
  phone_no: string;
  password: string;
}

// ── Response Types ────────────────────────────────────────────────────────────

export interface IRegisterResponse {
  status: boolean;
  message: string;
}

export interface ILoginResponse {
  status: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
}

// ── Endpoints ─────────────────────────────────────────────────────────────────

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: (body: IRegisterRequest) => ({
        url: "/authentication/v1/user/register/",
        method: "POST",
        body,
      }),
      transformResponse: (response: IRegisterResponse) => response,
    }),

    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body: ILoginRequest) => ({
        url: "/authentication/v1/user/login/",
        method: "POST",
        body,
      }),
      transformResponse: (response: ILoginResponse) => response,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
} = authApi;