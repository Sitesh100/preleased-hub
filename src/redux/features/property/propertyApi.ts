import { baseApi } from "@/src/redux/api/baseApi";


export interface ICreatePropertyRequest {
  property_name: string;
  city: string;
  location: string;
  property_type: string | number;
  rooms: string | number;
  built_up_area: string | number;
  listing_type: string | number;
  selling_price: string | number;
  expected_monthly_rent: string | number;
  security_deposit: string | number;
  annual_rental_income: string | number;
  lock_in_period: string | number;
  owner_company_name: string;
  phone_number: string;
  email_address: string;
  property_description: string;
  uploaded_documents: File | File[];
}

export interface IUpdatePropertyRequest extends Partial<ICreatePropertyRequest> {
  id: string;
}

export interface ICreateInquiryRequest {
  property: string;
}

export interface ISellerRequestMeetingRequest {
  id: string;
}

export interface IFilterPropertiesRequest {
  location?: string;
  property_type?: string;
  listing_type?: string | number;
  area?: string | number;
}

export type IAdminLeadAction = "approve" | "disapprove" | "send_link";

export interface IHandleAdminLeadRequest {
  id: string;
  action: IAdminLeadAction;
  meet_link?: string;
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

export type IGetSellerReceivedInquiriesResponse = IGetMyInquiriesResponse;

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
export type IGetSellerReceivedInquiriesQueryResponse = IGetSellerReceivedInquiriesResponse;
export type IHandleAdminLeadResponse = ICreatePropertyResponse;
export type ISellerRequestMeetingResponse = ICreatePropertyResponse;
export type IFilterPropertiesResponse = unknown;
export type IPropertyViewResponse = unknown;


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
      invalidatesTags: ["Property"],
    }),

    viewProperty: builder.query<IViewPropertyResponse, void>({
      query: () => ({
        url: "/user/v1/property/listing/approve_property_view/",
        method: "GET",
      }),
      transformResponse: (response: IViewPropertyResponse) => response,
      providesTags: ["Property"],
    }),

    propertyView: builder.query<IPropertyViewResponse, void>({
      query: () => ({
        url: "/user/v1/property/listing/property_view/",
        method: "GET",
      }),
      transformResponse: (response: IPropertyViewResponse) => response,
      providesTags: ["Property"],
    }),

    updateProperty: builder.mutation<IUpdatePropertyResponse, IUpdatePropertyRequest>({
      query: (body: IUpdatePropertyRequest) => ({
        url: "/user/v1/property/listing/property_update/",
        method: "PATCH",
        body: appendFormData(body),
      }),
      transformResponse: (response: IUpdatePropertyResponse) => response,
      invalidatesTags: ["Property"],
    }),

    deleteProperty: builder.mutation<IDeletePropertyResponse, string>({
      query: (id: string) => ({
        url: `/user/v1/property/listing/property_delete/${id}/`,
        method: "DELETE",
      }),
      transformResponse: (response: IDeletePropertyResponse) => response,
      invalidatesTags: ["Property"],
    }),

    createInquiry: builder.mutation<ICreateInquiryResponse, ICreateInquiryRequest>({
      query: (body: ICreateInquiryRequest) => ({
        url: "/user/v1/property/inquiry/inquiry_create/",
        method: "POST",
        body,
      }),
      transformResponse: (response: ICreateInquiryResponse) => response,
      invalidatesTags: ["Inquiry"],
    }),

    getMyInquiries: builder.query<IGetMyInquiriesQueryResponse, void>({
      query: () => ({
        url: "/user/v1/property/inquiry/my_inquiries/",
        method: "GET",
      }),
      transformResponse: (response: IGetMyInquiriesQueryResponse) => response,
      providesTags: ["Inquiry"],
    }),

    getSellerReceivedInquiries: builder.query<IGetSellerReceivedInquiriesQueryResponse, void>({
      query: () => ({
        url: "/user/v1/property/inquiry/seller_received_inquiries/",
        method: "GET",
      }),
      transformResponse: (response: IGetSellerReceivedInquiriesQueryResponse) => response,
      providesTags: ["Inquiry"],
    }),

    sellerRequestMeeting: builder.mutation<ISellerRequestMeetingResponse, ISellerRequestMeetingRequest>({
      query: (body: ISellerRequestMeetingRequest) => ({
        url: "/user/v1/property/inquiry/seller_request_meeting/",
        method: "PATCH",
        body,
      }),
      transformResponse: (response: ISellerRequestMeetingResponse) => response,
      invalidatesTags: ["Inquiry"],
    }),

    filterProperties: builder.query<IFilterPropertiesResponse, IFilterPropertiesRequest>({
      query: (params: IFilterPropertiesRequest) => ({
        url: "/user/v1/property/listing/filter_properties/",
        method: "GET",
        params,
      }),
      transformResponse: (response: IFilterPropertiesResponse) => response,
      providesTags: ["Property"],
    }),

    handleBuyerOperatorLead: builder.mutation<IHandleAdminLeadResponse, IHandleAdminLeadRequest>({
      query: (body: IHandleAdminLeadRequest) => ({
        url: "/adminside/v1/property/inquiry/handle_buyer_operator_lead/",
        method: "PATCH",
        body,
      }),
      transformResponse: (response: IHandleAdminLeadResponse) => response,
      invalidatesTags: ["Inquiry"],
    }),

    handleLesseeOperatorLead: builder.mutation<IHandleAdminLeadResponse, IHandleAdminLeadRequest>({
      query: (body: IHandleAdminLeadRequest) => ({
        url: "/adminside/v1/property/inquiry/handle_lessee_operator_lead/",
        method: "PATCH",
        body,
      }),
      transformResponse: (response: IHandleAdminLeadResponse) => response,
      invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  usePropertyViewQuery,
  useViewPropertyQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useCreateInquiryMutation,
  useGetMyInquiriesQuery,
  useGetSellerReceivedInquiriesQuery,
  useSellerRequestMeetingMutation,
  useLazyFilterPropertiesQuery,
  useHandleBuyerOperatorLeadMutation,
  useHandleLesseeOperatorLeadMutation,
} = propertyApi;
