
export const MoviesList = ({ released = true, isLoading, isSuccess, isError, content }) => {
  const mockData = [0, 1, 2, 3, 4]
  console.log(isLoading, content)

  if (isError && !isSuccess)
    return <div></div>

  if (isLoading)
    return (
      <div className="h-full w-full md:flex grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-3 md:grid-cols-none gap-y-5 md:flex-col">
        {mockData.map((_, index) => (
          <div key={index} className="flex justify-center md:justify-start h-full items-center">
            <div className="max-w-20 w-1/2 md:w-5/12 max-h-28 h-28 mr-3 rounded-xl skeleton" />
            <div className="md:flex-grow flex flex-col md:w-1/2 max-h-28 h-28 justify-start">
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
    <div className="h-full w-full md:flex grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-3 md:grid-cols-none gap-y-5 md:flex-col">
      {content.map((movie, index) => (
        <div key={index} className="flex justify-center md:justify-start h-full items-center">
          <div className="max-w-20 w-1/2 md:w-5/12 max-h-28 h-28 mr-3 rounded-xl bg-gray-800">
            <img className="object-contain rounded-xl" src={movie.image_url} />
          </div>
          <div className="md:flex-grow flex flex-col md:w-1/2 max-h-28 h-28 justify-start">
            <p className="text-gray-100 text-md font-semibold leading-tight">
              {movie.title}
            </p>
            <p className="flex-grow text-gray-500 text-sm leading-tight mt-1">
              {movie.gen.map((g, i) => i < 3 ? g.genre + (i != movie.gen.length - 1 ? ", " : "") : "")}
            </p>
            {released ? (
              <div>
                <img src="./imdb-logo-transparent.png" className="inline-block w-12 h-6 rounded-xl mr-2" />
                <p className="inline-block font-semibold">{movie.rating == 0 ? "N.A" : movie.rating}</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-light">{movie.release}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}