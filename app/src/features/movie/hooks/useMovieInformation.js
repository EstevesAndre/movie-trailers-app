import { useQuery } from 'react-query'
import { freshQueryConfig } from '@/lib/react-query'
import { getMovieInformation } from '../api'

export const useMovieInformation = (imdb_id) => {
  return useQuery(
    {
      ...freshQueryConfig,
      enabled: Boolean(imdb_id),
      queryKey: ['movieInformation', imdb_id],
      queryFn: () => getMovieInformation(imdb_id),
    }
  )
}
