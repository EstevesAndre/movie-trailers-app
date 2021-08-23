import { Navigate } from "react-router-dom"
import { Button } from "@/components/Elements/Button/Button"
import { Spinner } from "@/components/Elements/Spinner/Spinner"
import { MoviesList } from './MoviesList'

// import { usePopularMovies, useUpcomingMovies } from "../hooks/useMovies"

const MoviesComponentLayout = ({ children, title, page, query }) => {

  return (
    <div className="flex h-full flex-col py-10">
      <p className="text-xl font-semibold">{title}</p>
      <div className="py-5 flex-grow">
        {query?.isLoading && <Spinner size="sm" />}
        {!query?.isLoading && !query?.data?.length ? (
          <p>No movies found!</p>
        ) : children}
      </div>
      <Button className="mt-4" onClick={() => Navigate(`/${page}`)}>See more</Button>
    </div>
  )
}

export const PopularMovies = () => {
  const moviesQuery = null//usePopularMovies()

  return (
    <MoviesComponentLayout
      title="Popular Movies"
      page="popular-movies"
      query={moviesQuery}
    >
      <MoviesList content={[]} />
    </MoviesComponentLayout>
  )
}

export const UpcomingMovies = () => {
  const moviesQuery = null//useUpcomingMovies()

  return (
    <MoviesComponentLayout
      title="Upcoming Movies"
      page="upcoming-movies"
      query={moviesQuery}
    >
      <MoviesList content={[]} />
    </MoviesComponentLayout>
  )
}