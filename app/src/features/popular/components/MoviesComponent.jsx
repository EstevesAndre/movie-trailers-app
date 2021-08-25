import clsx from 'clsx'
import { Navigate } from "react-router-dom"
import { Button } from "@/components/Elements/Button/Button"
// import { Spinner } from "@/components/Elements/Spinner/Spinner"
import { MoviesList } from './MoviesList'

// import { usePopularMovies, useUpcomingMovies } from "../hooks/useMovies"

const MoviesComponentLayout = ({ children, title, page, className }) => {

  return (
    <div className={clsx("flex h-full w-full md:w-9/12 flex-col", className)}>
      <p className="text-xl font-semibold text-center md:text-left">{title}</p>
      <div className="mt-6 md:mt-5 md:pr-3 md:overflow-y-scroll">
        {children}
        {/* {query?.isLoading && <Spinner size="sm" />}
        {!query?.isLoading && !query?.data?.length ? (
          <p>No movies found!</p>
        ) : children} */}
      </div>
      <Button className="mt-6 md:mt-3 mx-auto md:mx-2" onClick={() => Navigate(`/${page}`)}>See more</Button>
    </div>
  )
}

export const PopularMovies = ({ className }) => {
  const moviesQuery = null//usePopularMovies()

  return (
    <MoviesComponentLayout
      title="Popular Movies"
      page="popular-movies"
      query={moviesQuery}
      className={className}
    >
      <MoviesList content={[]} />
    </MoviesComponentLayout>
  )
}

export const UpcomingMovies = ({ className }) => {
  const moviesQuery = null//useUpcomingMovies()

  return (
    <MoviesComponentLayout
      title="Upcoming Movies"
      page="upcoming-movies"
      query={moviesQuery}
      className={className}
    >
      <MoviesList content={[]} />
    </MoviesComponentLayout>
  )
}