import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {baseUrl} from '../constants'

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ['Invoice'],
  endpoints: builder => ({
    addUser: builder.mutation({
      query: user => ({
        url: '/signupuser',
        method: 'POST',
        body: user,
      }),
      providesTags: ['User'],
    }),
    myProfile: builder.query({
      query: userId => ({
        url: `/user/${userId}`,
        headers: {Authorization: `Bekki ${localStorage.getItem('jwt')}`},
      }),
      providesTags: ['User'],
    }),
    invoices: builder.query({
      query: () => ({
        url: '/invoice',
        headers: {Authorization: `Bekki ${localStorage.getItem('jwt')}`},
      }),
      providesTags: ['Invoice'],
    }),

    invoiceItemDetails: builder.query({
      query: invoiceId => ({
        url: `/invoice/${invoiceId}`,
        headers: {Authorization: `Bekki ${localStorage.getItem('jwt')}`},
      }),
    }),

    addInvoice: builder.mutation({
      query: invoice => ({
        url: '/createinvoice',
        method: 'POST',
        headers: {Authorization: `Bekki ${localStorage.getItem('jwt')}`},
        body: invoice,
      }),

      invalidatesTags: ['Invoice'],
    }),
    updateInvoice: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `/invoice/${id}`,
        method: 'PUT',
        headers: {Authorization: `Bekki ${localStorage.getItem('jwt')}`},
        body: rest,
      }),

      invalidatesTags: ['Invoice'],
    }),
    deleteInvoice: builder.mutation({
      query: id => ({
        url: `/invoice/${id}`,
        headers: {Authorization: `Bekki ${localStorage.getItem('jwt')}`},
        method: 'DELETE',
      }),
      invalidatesTags: ['Invoice'],
    }),
  }),
})

export const {
  useInvoicesQuery,
  useInvoiceItemDetailsQuery,
  useMyProfileQuery,
  useAddUserMutation,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi
