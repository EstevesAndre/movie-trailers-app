import { ChevronRightIcon, HomeIcon } from '@heroicons/react/outline'

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
          <a key={index} href={item.href} className="block space-x-3 space-y-5 pl-2 item hover:border-red-600 border-gray-900 border-r-2 ease-linear duration-200">
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
      <div className='w-64 absolute lg:relative bg-gray-900 shadow lg:h-full flex-col justify-between hidden lg:flex'>
        <div className='flex-none h-24 w-full pt-5 flex justify-center items-center'>
          <img src="./logo.png" className="h-full" />
          <p className='sm:block hidden sm:ml-3 font-mono font-semibold'>Movie Trailers</p>
          <p className='sm:block hidden text-red-500 font-black'>.</p>
        </div>
        <div className='flex-grow items'>
          <MenuGroup title="Menu" items={Menu} />
          <MenuGroup title="Searches" items={SearchesMock} />
        </div>
      </div>
    </div >
  )
}
