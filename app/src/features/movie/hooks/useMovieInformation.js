import { useQuery } from 'react-query'
import { defaultQueryConfig, freshQueryConfig } from '@/lib/react-query'
import { getMovieInformation, getMovieTrailers } from '../api'

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

export const useMovieTrailers = (title) => {
  return useQuery(
    {
      ...defaultQueryConfig,
      queryKey: ['movieTrailers', title],
      queryFn: () => getMovieTrailers(title),
    }
  )
}
