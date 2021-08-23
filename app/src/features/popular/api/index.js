import { axios } from '@/lib/axios'

export const getPopularMovies = () => {
  return axios.get('/popular-movies')
}

export const getUpcomingMovies = () => {
  return axios.get('/upcoming-movies')
}
