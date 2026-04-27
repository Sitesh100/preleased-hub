import { baseApi } from "@/src/redux/api/baseApi";


export interface ICreatePropertyRequest {
  owner_company_name: string;
  phone_number: string;
  email_address: string;
  property_name: string;
  city: string;
  full_address: string;
  expected_price_rent: string | number;
  rooms_keys: string | number;
  current_occupancy_percent: string | number;
  current_monthly_income: string | number;
  uploaded_documents: File | File[];
  intent: string | number;
  property_type: string | number;
}

export interface IUpdatePropertyRequest extends Partial<ICreatePropertyRequest> {
  id: string;
}

export interface ICreateInquiryRequest {
  property: string;
}

export interface IMyInquiryItem {
  id?: string | number;
  status?: string;
  [key: string]: unknown;
}

export type IGetMyInquiriesResponse =
  | IMyInquiryItem[]
  | {
      status?: boolean;
      message?: string;
      data?: IMyInquiryItem[] | null;
      results?: IMyInquiryItem[] | null;
      [key: string]: unknown;
    };

export interface ICreatePropertyResponse {
  status?: boolean;
  message?: string;
  data?: unknown;
}

export type IViewPropertyResponse = unknown;
export type IUpdatePropertyResponse = ICreatePropertyResponse;
export type IDeletePropertyResponse = ICreatePropertyResponse;
export type ICreateInquiryResponse = ICreatePropertyResponse;
export type IGetMyInquiriesQueryResponse = IGetMyInquiriesResponse;


function appendFormData<T extends object>(body: T) {
  const formData = new FormData();

  Object.entries(body as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
      return;
    }

    const isFile = typeof File !== "undefined" && value instanceof File;
    formData.append(key, isFile ? value : String(value));
  });

  return formData;
}


const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation<ICreatePropertyResponse, ICreatePropertyRequest>({
      query: (body: ICreatePropertyRequest) => ({
        url: "/user/v1/property/listing/property_create/",
        method: "POST",
        body: appendFormData(body),
      }),
      transformResponse: (response: ICreatePropertyResponse) => response,
    }),

    viewProperty: builder.query<IViewPropertyResponse, void>({
      query: () => ({
        url: "/user/v1/property/listing/property_view/",
        method: "GET",
      }),
      transformResponse: (response: IViewPropertyResponse) => response,
    }),

    updateProperty: builder.mutation<IUpdatePropertyResponse, IUpdatePropertyRequest>({
      query: (body: IUpdatePropertyRequest) => ({
        url: "/user/v1/property/listing/property_update/",
        method: "PATCH",
        body: appendFormData(body),
      }),
      transformResponse: (response: IUpdatePropertyResponse) => response,
    }),

    deleteProperty: builder.mutation<IDeletePropertyResponse, string>({
      query: (id: string) => ({
        url: `/user/v1/property/listing/property_delete/${id}/`,
        method: "DELETE",
      }),
      transformResponse: (response: IDeletePropertyResponse) => response,
    }),

    createInquiry: builder.mutation<ICreateInquiryResponse, ICreateInquiryRequest>({
      query: (body: ICreateInquiryRequest) => ({
        url: "/user/v1/property/inquiry/inquiry_create/",
        method: "POST",
        body,
      }),
      transformResponse: (response: ICreateInquiryResponse) => response,
    }),

    getMyInquiries: builder.query<IGetMyInquiriesQueryResponse, void>({
      query: () => ({
        url: "/user/v1/property/inquiry/my_inquiries/",
        method: "GET",
      }),
      transformResponse: (response: IGetMyInquiriesQueryResponse) => response,
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useViewPropertyQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useCreateInquiryMutation,
  useGetMyInquiriesQuery,
} = propertyApi;
