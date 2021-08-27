import { axios } from '@/lib/axios'

export const getMoviesByTitle = (search, offset) => {
  return axios.get(`/api/imdb/search-by-title?search=${search}&offset=${offset}`)
}