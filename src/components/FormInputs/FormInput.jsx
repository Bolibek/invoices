import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const FormInput = ({
  inputValue,
  labelText,
  inputType,
  className,
  id,
  isRegInput,
}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [currentValue, setCurrentValue] = useState(inputValue)
  const handleChange = e => {
    setCurrentValue(e.target.value)
  }
  return (
    <label
      htmlFor={id}
      className={
        isRegInput
          ? `flex flex-col my-1`
          : `font-spartan ${className} text-xs flex flex-col text-gray-400 font-medium`
      }
    >
      {labelText}
      {inputType !== 'date' ? (
        <input
          id={id}
          value={currentValue}
          onChange={handleChange}
          type={inputType}
          className={
            isRegInput
              ? `${className} my-1`
              : `rounded mt-[0.625rem] p-3 border border-gray-200 outline-0 focus:outline-1 outline-gray-400 text-xs box-border text-gray-600 font-bold`
          }
        />
      ) : (
        <DatePicker
          className={`mt-[0.625rem] p-3 border ${className} border-gray-200 outline-0 focus:outline-1 outline-gray-400 text-xs box-border text-gray-600 font-bold`}
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
      )}
    </label>
  )
}
export default FormInput
