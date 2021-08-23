import { SearchIcon } from '@heroicons/react/outline'
import { FilterElement } from './FilterElement'

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

export const SearchBar = ({ styles }) => {
  return (
    <div className={"w-8/12 flex mx-auto flex-col " + styles}>
      <div className="bg-gray-700 flex items-center rounded-lg shadow-xl w-full">
        <input className="rounded-l-full w-full py-2 pl-6 pr-2 bg-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search..." />
        <div className="py-2">
          <SearchIcon className="mr-3 w-6 h-6 rounded-full text-red-400 hover:text-red-500 cursor-pointer" type="button" />
        </div>
      </div>
      <div className="grid grid-flow-row gap-4 md:grid-cols-2 xl:grid-cols-4 mt-4">
        <FilterElement name="Rating" options={ratingOptions} />
        <FilterElement name="Genres" options={mockOptions} />
        <FilterElement name="Year" options={mockOptions} />
        <FilterElement name="Studio" options={mockOptions} />
      </div>
    </div>
  )
}