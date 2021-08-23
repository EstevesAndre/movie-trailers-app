// import { AxiosError } from 'axios'
// import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from 'react-query'
// import { PromiseValue } from 'type-fest'

import { QueryClient } from 'react-query'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10000,
  },
}

export const defaultQueryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10000,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
