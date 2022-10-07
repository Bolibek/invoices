import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {baseUrl} from '../constants'

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ['Invoice'],
  endpoints: builder => ({
    invoices: builder.query({
      query: () => '/invoice',
      providesTags: ['Invoice'],
    }),

    invoiceItemDetails: builder.query({
      query: invoiceId => `/invoice/${invoiceId}`,
    }),

    addInvoice: builder.mutation({
      query: invoice => ({
        url: '/invoice',
        method: 'POST',
        body: invoice,
      }),

      invalidatesTags: ['Invoice'],
    }),
    updateInvoice: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `/invoice/${id}`,
        method: 'PUT',
        body: rest,
      }),

      invalidatesTags: ['Invoice'],
    }),
    deleteInvoice: builder.mutation({
      query: id => ({
        url: `/invoice/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Invoice'],
    }),
  }),
})
export const {
  useInvoicesQuery,
  useInvoiceItemDetailsQuery,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi
