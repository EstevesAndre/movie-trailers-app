import { PopularMovies, UpcomingMovies } from "./MoviesComponent"

export const RightSideBar = () => {
  return (
    <div className='flex-0 flex h-full'>
      <div className='px-10 md:px-0 w-full md:w-64 lg:w-72 md:bg-gray-900 md:border-l-2 md:border-gray-700 shadow flex flex-col md:h-full md:justify-start md:items-center'>
        <div className='h-1/2 w-full flex items-center justify-center'>
          <PopularMovies className="pt-8 pb-2" />
        </div>
        <div className='h-1/2 w-full flex items-center justify-center'>
          <UpcomingMovies className="pb-5 pt-5" />
        </div>
      </div>
    </div >
  )
}
