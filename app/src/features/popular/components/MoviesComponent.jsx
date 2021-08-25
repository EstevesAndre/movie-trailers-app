import clsx from 'clsx'
import { Navigate } from "react-router-dom"
import { Button } from "@/components/Elements/Button/Button"
import { MoviesList } from './MoviesList'

import { useUpcomingMovies } from "../hooks/useMovies" // usePopularMovies

const MoviesComponentLayout = ({ children, title, page, query, className }) => {

  console.log(query)
  return (
    <div className={clsx("flex h-full w-full md:w-9/12 flex-col", className)}>
      <p className="text-xl font-semibold text-center md:text-left">{title}</p>
      <div className="mt-6 md:mt-5 md:pr-3 md:overflow-y-scroll">
        {!query?.isLoading && !query?.data?.movies?.length ? (
          <p>No movies found!</p>
        ) : children}
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
  const moviesQuery = useUpcomingMovies()

  return (
    <MoviesComponentLayout
      title="Upcoming Movies"
      page="upcoming-movies"
      query={moviesQuery}
      className={className}
    >
      <MoviesList isLoading={moviesQuery.isLoading} content={moviesQuery?.data?.movies || []} />
    </MoviesComponentLayout>
  )
}