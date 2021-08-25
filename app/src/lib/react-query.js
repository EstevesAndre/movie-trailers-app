// import { AxiosError } from 'axios'
// import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from 'react-query'
// import { PromiseValue } from 'type-fest'

import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import { QueryClient } from 'react-query'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: 86400000,
    cacheTime: 86400000,
  },
}

export const defaultQueryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: 86400000,
    cacheTime: 86400000,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage })

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor
})