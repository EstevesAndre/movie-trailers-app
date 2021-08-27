import { useQuery } from 'react-query'
import { freshQueryConfig } from '@/lib/react-query'
import { getMoviesByTitle } from '../api'

export const useMoviesByTitle = (search, offset = 0) => {
  return useQuery(
    {
      ...freshQueryConfig,
      enabled: Boolean(search),
      queryKey: ['moviesByTitle', search, offset],
      queryFn: () => getMoviesByTitle(search, offset),
    }
  )
}
