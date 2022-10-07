import React, {Fragment, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import ArrowDown from '../../assets/icon-arrow-down.svg'
import {netDays} from './Constants.jsx'

const FormDropdown = ({labelText, className}) => {
  const [selected, setSelected] = useState(netDays[0])

  return (
    <div className={`flex-grow w-full relative sm:mb-0 ${className}`}>
      <label className="text-xs text-gray-400">{labelText}</label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default border border-gray-200 bg-white p-3 text-left focus:outline-none focus-visible:border-purple text-xs  flex justify-between items-center">
            <span className="block text-sm truncate text-gray-600 font-bold">
              {selected}
            </span>
            <img src={ArrowDown} alt="Options" className="cursor-pointer" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-3 max-h-60 w-full overflow-auto rounded-lg border-none bg-white py-1 shadow-lg text-xs z-10">
              {netDays.map((days, daysIndex, array) => (
                <Listbox.Option
                  key={daysIndex}
                  className={({active}) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 
                    ${active ? 'text-purple' : 'text-gray-600'}
                   ${daysIndex === array.length - 1 ? '' : 'border-b-[1px]'}
                    `
                  }
                  value={days}
                >
                  <span className="block truncate font-medium">{days}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default FormDropdown
