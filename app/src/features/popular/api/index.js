import { axios } from '@/lib/axios'

export const getPopularMovies = () => {
  return axios.get('/popular-movies')
}

export const getUpcomingMovies = (offset) => {
  return axios.get(`/api/imdb/upcoming-movies?offset=${offset}`)
}
