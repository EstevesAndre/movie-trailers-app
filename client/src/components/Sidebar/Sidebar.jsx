import { ChevronRightIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

const MenuGroup = ({ title = '', items = [], onItemSelected = () => { } }) => {

  return (
    <div className="flex-1 pl-6 mt-12 pb-5">
      <p className="pr-6 uppercase text-sm text-gray-400 font-semibold mb-10">{title}</p>
      <div className="flex flex-col space-y-5">
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "flex justify-start items-center content-center",
              "border-r-2 ease-linear duration-200",
              "hover:border-red-600 border-gray-900",
              "hover:text-red-500 text-gray-400",
              "cursor-pointer duration-200"
            )}
            onClick={() => onItemSelected(index)}
          >
            <ChevronRightIcon className="w-6 h-6" />
            <p className="text-sm font-medium pl-2 py-2 text-current hover:text-current">{item.name}</p>
          </div>
        ))}
      </div>
    </div >
  )
}

export const Sidebar = ({ searches, onItemSelected = () => { } }) => {

  return (
    <div className='flex-0 flex flex-no-wrap h-full'>
      <div className='w-64 absolute lg:relative bg-gray-900 shadow flex-col justify-between hidden lg:flex'>
        <div className='flex-none h-24 w-full pt-5 flex justify-center items-center'>
          <img src="./logo.png" className="h-full" alt="logo" />
          <p className='sm:block hidden sm:ml-3 font-mono font-semibold'>Movie Trailers</p>
          <p className='sm:block hidden text-red-500 font-black'>.</p>
        </div>
        <div className='flex-grow items mb-2 overflow-hidden'>
          <MenuGroup title="Searches" items={searches} onItemSelected={onItemSelected} />
        </div>
      </div>
    </div>
  )
}
