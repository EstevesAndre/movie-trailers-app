import { useState, useEffect } from 'react'

import { Card } from '@/components/Elements/Card/Card'
import { Button } from '@/components/Elements/Button/Button'

import { MovieModal } from '@/features/movie/components/MovieModal'

import { SearchIcon } from '@heroicons/react/outline'

import { FilterElement } from './FilterElement'

import { useMoviesByTitle } from '../hooks/useMoviesSearch'

import clsx from 'clsx'

const ratingOptions = [
  { name: "All", value: 0, checked: true },
  { name: "> 8.5", value: 8.5, checked: false },
  { name: "> 7.5", value: 7.5, checked: false },
  { name: "> 6.5", value: 6.5, checked: false },
  { name: "> 5.5", value: 5.5, checked: false },
]

const genresOptions = [
  { name: "All", value: ["Adventure", "Action", "Family", "Fantasy", "Animation", "Drama", "Comedy", "Crime", "Sci-Fi", "Romance", "Music", "Thriller", "Mystery", "Horror", "War"], checked: true },
  { name: "Adventure", value: "Adventure", checked: true },
  { name: "Action", value: "Action", checked: true },
  { name: "Family", value: "Family", checked: true },
  { name: "Fantasy", value: "Fantasy", checked: true },
  { name: "Animation", value: "Animation", checked: true },
  { name: "Drama", value: "Drama", checked: true },
  { name: "Comedy", value: "Comedy", checked: true },
  { name: "Sci-Fi", value: "Sci-Fi", checked: true },
  { name: "Romance", value: "Romance", checked: true },
  { name: "Music", value: "Music", checked: true },
  { name: "Crime", value: "Crime", checked: true },
  { name: "Thriller", value: "Thriller", checked: true },
  { name: "Mystery", value: "Mystery", checked: true },
  { name: "Horror", value: "Horror", checked: true },
  { name: "War", value: "War", checked: true },
]

const yearsOptions = [
  { name: "All", value: [1900, 2021], checked: true },
  { name: "2021", value: [2021, 2021], checked: true },
  { name: "2020", value: [2020, 2020], checked: true },
  { name: "2019", value: [2019, 2019], checked: true },
  { name: "2018", value: [2018, 2018], checked: true },
  { name: "2017", value: [2017, 2017], checked: true },
  { name: "2016", value: [2016, 2016], checked: true },
  { name: "2015", value: [2015, 2015], checked: true },
  { name: "2015-2021", value: [2015, 2021], checked: true },
  { name: "2010-2014", value: [2010, 2014], checked: true },
  { name: "2005-2009", value: [2005, 2009], checked: true },
  { name: "2000-2004", value: [2000, 2004], checked: true },
  { name: "1990-1999", value: [1990, 1999], checked: true },
  { name: "1980-1989", value: [1980, 1989], checked: true },
  { name: "1950-1979", value: [1950, 1979], checked: true },
  { name: "1900-1949", value: [1900, 1949], checked: true },
]

const contentRatingOptions = [
  { name: "All", value: ["G", "PG", "TV-PG", "PG-13", "TV-Y", "R", "NC-17", "TV-Y7", "TV-G", "TV-MA", "TV-14"], checked: true },
  { name: "General Audience", value: ["G"], checked: true },
  { name: "Parental Guidance Suggested", value: ["PG", "TV-PG"], checked: true },
  { name: "Parents Strongly Cautioned", value: ["PG-13", "TV-Y"], checked: true },
  { name: "Restricted", value: ["R"], checked: true },
  { name: "No Children 17 or Under", value: ["NC-17"], checked: true },
  { name: "All Children", value: ["TV-Y"], checked: true },
  { name: "Directed to Older Children", value: ["TV-Y7"], checked: true },
  { name: "General Audience", value: ["TV-G"], checked: true },
  { name: "TV Mature Audience Only", value: ["TV-MA"], checked: true },
  { name: "Fantasy Violence", value: ["TV-Y7"], checked: true },
  { name: "Violence", value: ["TV-PG", "TV-14", "TV-MA"], checked: true },
  { name: "Sexuality", value: ["TV-PG", "TV-14", "TV-MA"], checked: true },
  { name: "Language", value: ["TV-PG", "TV-14", "TV-MA"], checked: true },
  { name: "Dialogue", value: ["TV-PG", "TV-14", "TV-MA"], checked: true },
]

const MoviesListCard = ({ className, search, isLoading, isSuccess, isError, content }) => {
  const mockData = [1, 2, 3, 4, 5, 6, 7, 8]
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

export const SearchBar = ({ className, updateSearches, searchSelected }) => {
  const [search, setSearch] = useState('')
  const [searchSubmit, setSearchSubmit] = useState('')

  const [ratings, setRatings] = useState(ratingOptions[0].value)
  const [genres, setGenres] = useState(genresOptions[0].value)
  const [years, setYears] = useState([yearsOptions[0].value])
  const [contentRatings, setContentRatings] = useState(contentRatingOptions[0].value)

  const [requestParams, setRequestParams] = useState({
    ratings: ratings,
    genres: genres.slice(),
    years: years.slice(),
    contentRatings: contentRatings.slice()
  })

  const moviesQuery = useMoviesByTitle(searchSubmit, 0, requestParams)

  const setParams = (params) => {
    setRequestParams(params)

    setRatings(params.ratings)
    setGenres(params.genres)
    setYears(params.years)
    setContentRatings(params.contentRatings)
  }

  const checkAll = (options) => {
    return options[0].checked
  }

  const setRatingsValue = (options) => {
    setRatings(options.find(item => item.checked).value)
  }
  const setGenresValue = (options) => {
    if (checkAll(options)) setGenres(options[0].value)
    else setGenres(options.slice(1).filter(item => item.checked).map(item => item.value))
  }
  const setYearsValue = (options) => {
    if (checkAll(options)) setYears([options[0].value])
    else setYears(options.slice(1).filter(item => item.checked).map(item => item.value))
  }
  const setContentRatingsValue = (options) => {
    if (checkAll(options)) setContentRatings(options[0].value)
    else {
      const opt = new Set()
      options
        .slice(1)
        .filter(item => item.checked)
        .forEach(item => item.value.forEach(value => opt.add(value)))

      setContentRatings(Array.from(opt))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const newParams = {
      ratings: ratings,
      genres: genres.slice(),
      years: years.slice(),
      contentRatings: contentRatings.slice()
    }

    setRequestParams(newParams)
    setSearchSubmit(search)
    updateSearches(search, newParams)
  }

  useEffect(() => {
    if (searchSelected === -1) return

    setSearch(searchSelected.name)
    setParams(searchSelected.params)
    setSearchSubmit(searchSelected.name)
  }, [searchSelected])

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
          <FilterElement name="Rating" options={ratingOptions} setValue={setRatingsValue} />
          <FilterElement name="Genres" options={genresOptions} setValue={setGenresValue} type="checkbox" />
          <FilterElement name="Year" options={yearsOptions} setValue={setYearsValue} type="checkbox" />
          <FilterElement name="Content" options={contentRatingOptions} setValue={setContentRatingsValue} type="checkbox" />
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