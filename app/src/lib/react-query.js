
// import { AxiosErrorW } from 'axios'
// import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from 'react-query'
// import { PromiseValue } from 'type-fest'
import { QueryClient } from 'react-query'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

// export type QueryConfig<FetcherFnType extends (...args: any) => any> = UseQueryOptions<
//   PromiseValue<ReturnType<FetcherFnType>>
// >

// export type MutationConfig<FetcherFnType extends (...args: any) => any> = UseMutationOptions<
//   PromiseValue<ReturnType<FetcherFnType>>,
//   AxiosError,
//   Parameters<FetcherFnType>[0]
// >