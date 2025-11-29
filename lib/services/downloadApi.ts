import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const downloadApi = createApi({
  reducerPath: 'downloadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    // Download program file via guest API route; returns a Blob
    downloadProgram: builder.query<Blob, { id: string }>({
      query: ({ id }) => ({
        url: `/api/guest/programs/${id}/download`,
        method: 'GET',
        // Return the raw Blob rather than JSON
        responseHandler: (response) => response.blob(),
      }),
    }),

    // Download certificate via guest certificate API; returns a Blob
    downloadCertificate: builder.query<Blob, void>({
      query: () => ({
        url: '/api/guest/certificate/download',
        method: 'GET',
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
})

export const {
  useLazyDownloadProgramQuery,
  useLazyDownloadCertificateQuery,
} = downloadApi