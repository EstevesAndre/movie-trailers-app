import clsx from 'clsx'
import { Navigate } from "react-router-dom"
import { Button } from "@/components/Elements/Button/Button"
import { MoviesList } from './MoviesList'

import { useUpcomingMovies, usePopularMovies } from "../hooks/useMovies"

const MoviesComponentLayout = ({ children, title, page, query, className }) => {

  return (
    <div className={clsx("flex h-full w-full lg:w-9/12 flex-col", className)}>
      <p className="text-xl font-semibold text-center lg:text-left">{title}</p>
      {(!query?.isLoading && query?.isError) ? (
        <div className="flex-grow">
          <p>No movies found!</p>
        </div>
      ) : (
        <div className="mt-6 lg:mt-5 lg:pr-3 lg:overflow-y-scroll">
          {children}
        </div>
      )}
      <Button className="mt-6 lg:mt-3 mx-auto lg:mx-2" onClick={() => Navigate(`/${page}`)}>See more</Button>
    </div>
  )
}

export const PopularMovies = ({ className }) => {
  const moviesQuery = usePopularMovies()

  return (
    <MoviesComponentLayout
      title="Popular Movies"
      page="popular-movies"
      query={moviesQuery}
      className={className}
    >
      <MoviesList isLoading={moviesQuery.isLoading} isSuccess={moviesQuery.isSuccess} isError={moviesQuery.isError} content={moviesQuery?.data?.movies || []} />
    </MoviesComponentLayout>
  )
}

export const UpcomingMovies = ({ className }) => {
  const moviesQuery = useUpcomingMovies()

  return (
    <MoviesComponentLayout
      title="Upcoming Movies"
      page="upcoming-movies"
      query={moviesQuery}
      className={className}
    >
      <MoviesList released={false} isLoading={moviesQuery.isLoading} isSuccess={moviesQuery.isSuccess} isError={moviesQuery.isError} content={moviesQuery?.data?.movies || []} />
    </MoviesComponentLayout>
  )
}