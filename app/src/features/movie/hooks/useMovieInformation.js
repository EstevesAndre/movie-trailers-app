import { useQuery } from 'react-query'
import { defaultQueryConfig } from '@/lib/react-query'
import { getMovieInformation, getMovieTrailers } from '../api'

export const useMovieInformation = (imdb_id) => {
  return useQuery(
    {
      ...defaultQueryConfig,
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
