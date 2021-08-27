import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { FilterElement } from './FilterElement'
import { Card } from '@/components/Elements/Card/Card'
import { useMoviesByTitle } from '../hooks/useMoviesSearch'
import clsx from 'clsx'
import { Button } from '@/components/Elements/Button/Button'
import { MovieModal } from '@/features/movie/components/MovieModal'

const ratingOptions = [
  { name: "> 8.5", checked: false },
  { name: "> 7.5", checked: false },
  { name: "> 6.5", checked: false },
  { name: "> 5.5", checked: false },
  { name: "All", checked: true },
]

const mockOptions = [
  { name: "Action", checked: true }
]

const MoviesListCard = ({ className, search, isLoading, isSuccess, isError, content }) => {
  const mockData = [0, 1, 2, 3, 2, 3]
  const [movieSelectedIndex, setMovieSelectedIndex] = useState(null)

  if (isError && !isSuccess) {
    return (
      <div className={clsx(className)}>
        <div className="flex justify-center h-full">
          <p className="text-3xl font-semibold self-center border-2 border-gray-500 rounded-xl p-5">Invalid Request !</p>
        </div>
      </div>
    )
  }

  if (isLoading)
    return (
      <div className={clsx(className)}>
        <p className="text-3xl font-semibold text-center pb-5">Results</p>
        <div className="flex flex-col gap-y-10 sm:gap-x-10 sm:flex-row sm:flex-wrap items-start justify-center">
          {mockData.map((_, index) => (
            <div key={index}>
              <Card mock={true} size="md" />
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div className={clsx(className, "flex flex-col h-full")}>
      {search !== '' && <p className="text-3xl font-semibold text-center pb-5">Results</p>}
      <div className="flex-transition h-full flex-grow flex flex-col gap-y-10 sm:gap-x-10 sm:flex-row sm:flex-wrap items-start justify-center">
        {content.map((movie, index) => (
          <div key={index}>
            <Card content={movie} size="md" setSelected={() => setMovieSelectedIndex(index)} />
          </div>
        ))}
        {content.length === 0 && search !== '' && <p className="text-xl self-center font-light">No results found for "{search}"</p>}
      </div>
      {
        content.length >= 6 &&
        <div className="mx-auto mt-5">
          <Button>Load more</Button>
        </div>
      }
      <MovieModal
        className={movieSelectedIndex != null ? "scale-100" : ""}
        basicContent={content[movieSelectedIndex] || null}
        onClose={() => setMovieSelectedIndex(null)}
      />
    </div>
  )
}

export const SearchBar = ({ className }) => {
  const [search, setSearch] = useState('')
  const [searchSubmit, setSearchSubmit] = useState('')

  const moviesQuery = useMoviesByTitle(searchSubmit)

  const onSubmit = (e) => {
    e.preventDefault()
    setSearchSubmit(search)
  }

  return (
    <div className={clsx(className, "flex flex-col flex-transition")}>
      <div className="flex-0 w-8/12 flex mx-auto flex-col pb-5">
        <form onSubmit={onSubmit}>
          <div className="bg-gray-700 flex items-center rounded-lg shadow-xl w-full">
            <input
              className="rounded-l-full w-full py-2 pl-6 pr-2 bg-gray-700 leading-tight focus:outline-none"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="py-2.5">
              <SearchIcon className="mr-3 w-6 h-6 rounded-full text-red-400 hover:text-red-500 cursor-pointer" type="button" />
            </button>
          </div>
        </form>
        <div className="grid grid-flow-row gap-4 md:grid-cols-2 xl:grid-cols-4 mt-4">
          <FilterElement name="Rating" options={ratingOptions} />
          <FilterElement name="Genres" options={mockOptions} />
          <FilterElement name="Year" options={mockOptions} />
          <FilterElement name="Studio" options={mockOptions} />
        </div>
      </div>
      <MoviesListCard
        className="flex-grow flex-transition"
        search={searchSubmit}
        isLoading={moviesQuery.isLoading}
        isSuccess={moviesQuery.isSuccess}
        isError={moviesQuery.isError}
        content={moviesQuery?.data?.movies || []}
      />
    </div>
  )
}