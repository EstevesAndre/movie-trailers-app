import { useQuery } from 'react-query'
import { defaultQueryConfig } from '@/lib/react-query'
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../api'

export const usePopularMovies = (offset = 0) => {
  return useQuery({
    ...defaultQueryConfig,
    queryKey: [`popularMovies${offset}`],
    queryFn: () => getPopularMovies(offset),
  })
}

export const useUpcomingMovies = (offset = 0) => {
  return useQuery({
    defaultQueryConfig,
    queryKey: [`upcomingMovies${offset}`],
    queryFn: () => getUpcomingMovies(offset),
  })
}

export const useTopRatedMovies = (offset = 0) => {
  return useQuery({
    defaultQueryConfig,
    queryKey: [`topRatedMovies${offset}`],
    queryFn: () => getTopRatedMovies(offset),
  })
}