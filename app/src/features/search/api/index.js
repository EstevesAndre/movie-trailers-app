import { axios } from '@/lib/axios'

export const searchMovies = (data) => {
  return axios.get('/search-by-title', data)
}