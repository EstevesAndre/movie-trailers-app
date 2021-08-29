import { useQuery } from 'react-query'
import { defaultQueryConfig } from '@/lib/react-query'
import { getMoviesByTitle } from '../api'

export const useMoviesByTitle = (search, offset = 0, params = {}) => {
  return useQuery(
    {
      ...defaultQueryConfig,
      enabled: Boolean(search),
      queryKey: ['moviesByTitle', search, offset, JSON.stringify(params)],
      queryFn: () => getMoviesByTitle(search, offset, params),
    }
  )
}
