import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key','804bfb492emshfaed7d88d626d02p1b8ce9jsn1fa0e04dc715');
      headers.set('x-rapidapi-host', 'shazam-core.p.rapidapi.com');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world?country_code=DZ' }),
   
  }),
});

export const {
  useGetTopChartsQuery,
 
} = shazamCoreApi;