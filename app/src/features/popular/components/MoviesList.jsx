
export const MoviesList = ({ isLoading, content }) => {
  const mockData = [0, 1, 2, 3, 4]
  console.log(isLoading, content)
  return (
    <div className="h-full w-full md:flex grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-3 md:grid-cols-none gap-y-5 md:flex-col">
      {mockData.map((value, index) => (
        <div key={index} className="flex justify-center md:justify-start h-full items-center">
          <div className="max-w-20 w-1/2 md:w-5/12 max-h-28 h-28 mr-3 rounded-xl bg-gray-800">
          </div>
          <div className="md:flex-grow flex flex-col md:w-1/2 max-h-28 h-28 justify-start">
            <p className="text-gray-100 text-md font-semibold truncate">John Wick {value}</p>
            <p className="flex-grow text-gray-500 text-sm truncate mt-1">Action, Horror</p>
            <div>
              <img src="./imdb-logo-transparent.png" className="inline-block w-12 h-6 rounded-xl mr-2" />
              <p className="inline-block font-bold">8.1</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}