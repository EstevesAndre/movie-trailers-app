import { axios } from '@/lib/axios'

export const getMovieInformation = (imdb_id) => {
  return axios.get(`/api/imdb-api/movie-information?imdb_id=${imdb_id}`)
}