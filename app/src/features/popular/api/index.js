import { axios } from '@/lib/axios'

const imdb = "/api/imdb"

export const getPopularMovies = (offset) => {
  return axios.get(`${imdb}/popular-movies?offset=${offset}`)
}

export const getUpcomingMovies = (offset) => {
  return axios.get(`${imdb}/upcoming-movies?offset=${offset}`)
}

export const getTopRatedMovies = (offset) => {
  return axios.get(`${imdb}/top-rated-movies?offset=${offset}`)
}