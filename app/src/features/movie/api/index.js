import { axios } from '@/lib/axios'

export const getMovieInformation = (imdb_id) => {
  return axios.get(`/api/imdb-api/movie-information?imdb_id=${imdb_id}`)
}

export const getMovieTrailers = (title) => {
  return axios.get(`/api/youtube/movie-trailers?movie=${title}`)
}