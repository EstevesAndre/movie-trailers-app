import { axios } from '@/lib/axios'

export const getMoviesByTitle = (search, offset, parameters) => {
  return axios
    .get(
      `/api/imdb/search-by-title?search=${search}&offset=${offset}`,
      {
        params: {
          ratings: JSON.stringify(parameters.ratings),
          genres: JSON.stringify(parameters.genres),
          years: JSON.stringify(parameters.years),
          contentRatings: JSON.stringify(parameters.contentRatings)
        }
      },
    )
}