import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export const FilterElement = ({ name = '', options = [] }) => {
  const [selected,] = useState(options[options.length - 1])

  const handleChange = () => {
    // selected.checked = false
    // options[index].checked = true
    // setSelected(options[index])
  }

  return (
    <Menu as="div" className="relative ">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-lg border border-gray-400 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {`${name}: ${selected.name}`}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          {open && (
            <div>
              <Menu.Items static className="origin-top-right absolute z-40 right-0 mt-2 w-56 rounded-lg shadow-lg bg-gray-700 border-gray-400 text-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-3">
                  {options.map((option, index) => (
                    <Menu.Item key={index}>
                      <div className="px-4 py-1">
                        <label className="inline-flex items-center">
                          <input type="radio" checked={option.checked} onChange={handleChange} />
                          <span className="ml-2">{option.name}</span>
                        </label>
                      </div>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </div>
          )}
        </>
      )}
    </Menu>
  )
}