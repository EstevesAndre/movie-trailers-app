import { PopularMovies, UpcomingMovies } from "./MoviesComponent"

export const RightSideBar = () => {
  return (
    <div className='flex-0 flex h-full'>
      <div className='px-10 lg:px-0 w-full lg:w-72 lg:bg-gray-900 flex flex-col lg:h-full lg:justify-start lg:items-center'>
        <div className='w-full flex items-center justify-center'>
          <PopularMovies className="pt-8 pb-2" />
        </div>
        <div className='w-full flex items-center justify-center'>
          <UpcomingMovies className="pb-5 pt-5" />
        </div>
      </div>
    </div >
  )
}
