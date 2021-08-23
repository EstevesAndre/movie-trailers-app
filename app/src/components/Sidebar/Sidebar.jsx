import { ChevronRightIcon, FilmIcon, HomeIcon } from '@heroicons/react/outline'

const Menu = [
  { name: 'Home', href: '#', current: true, icon: <HomeIcon /> },
  { name: 'Best Movies', href: '#', current: false, icon: <HomeIcon /> },
  { name: 'Best Artists', href: '#', current: false, icon: <HomeIcon /> },
  { name: 'Favorites', href: '#', current: false, icon: <HomeIcon /> },
]

const SearchesMock = [
  { name: 'SpiderMan', href: '#' },
  { name: 'SherlockHolmes', href: '#' },
  { name: 'Infinity War', href: '#' },
]

const MenuGroup = ({ title = '', items = [] }) => {
  return (
    <div className="flex-1 pl-6 mt-12 pb-5">
      <p className="pr-6 uppercase text-sm text-gray-400 font-semibold mb-2">{title}</p>
      <ul>
        {items.map((item, index) => (
          <a key={index} href={item.href} className="block space-x-3 space-y-5 pl-2 item hover:border-red-400 border-gray-900 border-r-2 ease-linear duration-200">
            {item.icon ? item.icon : <ChevronRightIcon />}
            <p className="inline-block text-sm font-medium text-gray-400">{item.name}</p>
          </a>
        ))}
      </ul>
    </div >
  )
}

export const Sidebar = () => {
  return (
    <div className='flex-0 flex flex-no-wrap h-full' id="Sidebar">
      <div className='w-64 absolute sm:relative bg-gray-900 border-r-2 border-gray-700 shadow md:h-full flex-col justify-between hidden sm:flex'>
        <div className='flex-none h-16 px-6 w-full flex items-center'>
          <FilmIcon className='h-8 w-auto text-red-400 sm:block hidden' />
          <p className='sm:block hidden sm:ml-3 font-mono'>Movie{'<>'}Trailer</p>
          <p className='sm:block hidden text-red-500'>.</p>
        </div>
        <div className='flex-grow items'>
          <MenuGroup title="Menu" items={Menu} />
          <MenuGroup title="Searches" items={SearchesMock} />
        </div>
      </div>
    </div >
  )
}
