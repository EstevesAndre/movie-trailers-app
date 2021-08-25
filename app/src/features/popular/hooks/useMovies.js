import { useQuery } from 'react-query'
import { defaultQueryConfig } from '@/lib/react-query'
import { getPopularMovies, getUpcomingMovies } from '../api'

export const usePopularMovies = () => {
  return useQuery({
    ...defaultQueryConfig,
    queryKey: ['popularMovies'],
    queryFn: () => getPopularMovies(),
  })
}

export const useUpcomingMovies = (offset = 0) => {
  return useQuery({
    defaultQueryConfig,
    queryKey: [`upcomingMovies${offset}`],
    queryFn: () => getUpcomingMovies(offset),
  })
}