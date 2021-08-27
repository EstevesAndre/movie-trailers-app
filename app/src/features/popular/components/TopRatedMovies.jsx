import { Card } from "@/components/Elements/Card/Card"
import { useTopRatedMovies } from "../hooks/useMovies"

export const TopRatedMovies = ({ styles }) => {
  const moviesQuery = useTopRatedMovies()
  const mockData = [1, 2, 3, 4, 5, 6, 7, 8]

  if (moviesQuery.isError)
    return (
      <div>
        <p className="text-3xl font-semibold text-center pb-10">Top Rated Movies</p>
        <p className="text-xl font-thin text-center pb-10">{`Failed to fetch data! :(`}</p>
      </div>
    )

  if (moviesQuery.isLoading)
    return (
      <div className={styles}>
        <p className="text-3xl font-semibold text-center pb-10">Top Rated Movies</p>
        <div className="flex flex-col gap-y-10 sm:gap-x-10 sm:flex-row sm:flex-wrap items-start justify-center">
          {mockData.map((_, index) => (
            <div key={index}>
              <Card mock={true} size="sm" />
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div className={styles}>
      <p className="text-3xl font-semibold text-center pb-10">Top Rated Movies</p>
      <div className="flex flex-col gap-y-10 sm:gap-x-10 sm:flex-row sm:flex-wrap items-start justify-center">
        {moviesQuery?.data?.movies.map((movie, index) => (
          <div key={index}>
            <Card content={movie} size="sm" />
          </div>
        ))}
      </div>
    </div>
  )
}