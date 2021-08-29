import { useState } from 'react'
import { MovieModal } from '@/features/movie/components/MovieModal'
import clsx from 'clsx'

const SideBarMovieCard = ({ className, released, movie, setSelected = () => { } }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className={className}>
      <div className="max-w-20 w-1/2 lg:w-5/12 max-h-28 h-28 mr-3 rounded-xl cursor-pointer" onClick={setSelected}>
        <img
          className={clsx(
            "object-contain w-full h-full rounded-xl border-2",
            isHover ? "border-gray-200" : "border-gray-600",
            "duration-200"
          )}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          src={movie.image_url}
          onError={(e) => { e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("xs:onErrorSize") }}
        />
      </div>
      <div className="lg:flex-grow flex flex-col lg:w-1/2 max-h-28 h-28 justify-start">
        <p className="text-gray-100 text-md font-semibold leading-tight">
          {movie.title}
        </p>
        <p className="flex-grow text-gray-500 text-sm leading-tight mt-1">
          {movie.gen.map((g, i) => i < 3 ? g.genre + (i != movie.gen.length - 1 ? ", " : "") : "")}
        </p>
        {released ? (
          <div>
            <img src="./imdb-logo-transparent.png" className="inline-block w-12 rounded-xl mr-2" />
            <p className="inline-block font-semibold">{movie.rating == 0 ? "N.A" : movie.rating}</p>
          </div>
        ) : (
          <div>
            <span className="font-light text-sm">Premiere:</span>
            <p className="text-sm font-light">{movie.release}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const MoviesList = ({ released = true, isLoading, isSuccess, isError, content }) => {
  const mockData = [0, 1, 2, 3, 4]
  const [movieSelectedIndex, setMovieSelectedIndex] = useState(null)

  if (isError && !isSuccess)
    return <div></div>

  if (isLoading)
    return (
      <div className="h-full w-full lg:flex grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-none gap-y-5 lg:flex-col">
        {mockData.map((_, index) => (
          <div key={index} className="flex lg:justify-center h-full items-center">
            <div className="max-w-20 w-1/2 lg:w-5/12 max-h-28 h-28 mr-3 rounded-xl skeleton" />
            <div className="lg:flex-grow flex flex-col lg:w-1/2 max-h-28 h-28 justify-start">
              <div className="skeleton skeleton-text w-3/5 mt-1" />
              <div className="flex-grow">
                <div className="skeleton skeleton-text w-full mt-2" />
              </div>
              <div className="skeleton skeleton-text py-2 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    )

  return (
    <div className="h-full w-full lg:flex grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-none gap-y-5 lg:flex-col">
      {content.map((movie, index) => (
        <SideBarMovieCard
          key={index}
          className="flex lg:justify-center h-full items-center"
          movie={movie}
          setSelected={() => setMovieSelectedIndex(index)}
          released={released}
        />
      ))}
      <MovieModal
        className={movieSelectedIndex != null ? "scale-100" : "scale-0"}
        basicContent={content[movieSelectedIndex] || null}
        onClose={() => setMovieSelectedIndex(null)}
      />
    </div>
  )
}