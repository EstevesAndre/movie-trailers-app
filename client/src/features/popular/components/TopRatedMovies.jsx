import { useState } from 'react'
import { Card } from "@/components/Elements/Card/Card"
import { useTopRatedMovies } from "../hooks/useMovies"
import { MovieModal } from '@/features/movie/components/MovieModal'

export const TopRatedMovies = ({ styles }) => {
  const moviesQuery = useTopRatedMovies()
  const mockData = [1, 2, 3, 4, 5, 6, 7, 8]
  const [movieSelectedIndex, setMovieSelectedIndex] = useState(null)

  if (moviesQuery.isError)
    return (
      <div>
        <p className="text-3xl font-semibold text-center pb-10">Top Rated Movies</p>
        <p className="text-xl font-thin text-center pb-10">{`Failed to fetch data! :(`}</p>
      </div>
    )

  return (
    <div className={styles}>
      <p className="text-3xl font-semibold text-center pb-10">Top Rated Movies</p>
      <div className="flex flex-col gap-y-10 sm:gap-x-10 sm:flex-row sm:flex-wrap items-start justify-center">
        {
          moviesQuery.isLoading ? (
            mockData.map((_, index) => (
              <div key={index}>
                <Card mock={true} size="sm" />
              </div>
            ))
          ) : (
            moviesQuery?.data?.movies.map((movie, index) => (
              <div key={index}>
                <Card content={movie} size="sm" setSelected={() => setMovieSelectedIndex(index)} />
              </div>
            ))
          )
        }
      </div>
      <MovieModal
        className={movieSelectedIndex != null ? "scale-100" : "scale-0"}
        basicContent={moviesQuery?.data?.movies[movieSelectedIndex] || null}
        onClose={() => setMovieSelectedIndex(null)}
      />
    </div>
  )
}