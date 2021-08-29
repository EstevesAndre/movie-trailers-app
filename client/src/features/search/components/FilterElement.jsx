import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export const FilterElement = ({ name = '', options = [], setValue = () => { }, type = "radio" }) => {
  const [selected, setSelected] = useState({ index: options.findIndex(item => item.checked), ...options.find(item => item.checked) })
  const [inputOptions, setInputOptions] = useState(options.slice())

  const handleChange = (index) => {
    const copy = inputOptions.slice()

    if (type === "radio") {
      copy[selected.index].checked = false
      copy[index].checked = true
      setSelected({ index: index, ...copy[index] })
      setInputOptions(copy)
      setValue(copy)
      return
    }

    if (copy[index].name === "All") {
      const newState = !inputOptions[index].checked
      copy.forEach(item => item.checked = newState)
      setSelected({ name: newState ? "All" : "None" })
    } else {
      if (copy[index].checked) {
        copy.find(item => item.name === "All").checked = false
      }
      copy[index].checked = !copy[index].checked

      setSelected({
        name: `${copy.reduce((acc, cur) => acc + (cur.checked ? 1 : 0), 0)} selected`
      })
    }
    setInputOptions(copy)
    setValue(copy)
  }

  return (
    <Menu as="div" className="relative ">
      {({ open }) => (
        <>
          <div className="h-full">
            <Menu.Button className="inline-flex justify-center w-full h-full items-center rounded-lg border border-gray-400 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {`${name}: ${selected.name}`}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          {open && (
            <div>
              <Menu.Items static className="origin-top-right absolute z-40 right-0 mt-2 w-full rounded-lg shadow-lg bg-gray-700 border-gray-400 text-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-3">
                  {inputOptions.map((option, index) => (
                    <Menu.Item key={index}>
                      <div className="px-4 py-1">
                        <label className="px-2 py-1 flex items-center cursor-pointer hover:border-gray-100 border-2 border-gray-700 duration-200 rounded-xl" onClick={(e) => { e.stopPropagation() }}>
                          <input type={type} checked={option.checked} onChange={() => { }} onClick={(e) => { e.stopPropagation(); handleChange(index) }} />
                          <p className="ml-2 w-full">{option.name}</p>
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