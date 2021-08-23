import { PopularMovies, UpcomingMovies } from "./MoviesComponent"

export const RightSideBar = () => {
  return (
    <div className='flex-0 flex flex-no-wrap h-full'>
      <div className='w-64 absolute sm:relative bg-gray-900 border-l-2 border-gray-700 shadow md:h-full sm:flex-col justify-between hidden sm:flex sm:justify-between sm:items-center'>
        <div className='flex-1 w-full flex items-center justify-center'>
          <PopularMovies />
        </div>
        <div className='flex-1 w-full flex items-center justify-center'>
          <UpcomingMovies />
        </div>
      </div>
    </div >
  )
}
