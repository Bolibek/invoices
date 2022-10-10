import React, {useState, useEffect} from 'react'
import DeleteIcon from '../../assets/icon-delete.svg'

function FormItemsRow({
  id,
  name,
  qty,
  price,
  total,
  setItemsRow,
  isEditForm,
  itemsRow,
}) {
  const [formValue, setFormValue] = useState({
    name,
    qty: isEditForm ? qty : 0,
    price: isEditForm ? price : 0,
    id,
    total: isEditForm ? total : 0,
  })

  function handleChange(event) {
    setFormValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
    setFormValue(prevState => ({
      ...prevState,
      total: prevState.qty * prevState.price,
    }))
  }

  useEffect(() => {
    setItemsRow &&
      setItemsRow(() => {
        const copy = [...itemsRow]
        copy[id - 1] = formValue
        return copy
      })
  }, [formValue])
  return (
    <div id={id} className="flex mt-4 space-between">
      <input
        placeholder="Item name"
        name={'name'}
        value={formValue.name}
        onChange={handleChange}
        type="text"
        className={`${
          isEditForm ? 'w-[14rem]' : 'w-[15rem]'
        } rounded mt-[0.625rem] p-5 border border-gray-200 outline-0 focus:outline-1 outline-gray-400 text-xs box-border text-gray-600 font-bold`}
      />
      <input
        placeholder="qty."
        name={'qty'}
        value={formValue.qty}
        onChange={handleChange}
        type="number"
        className="max-w-[3.5rem] mx-4 rounded mt-[0.625rem] p-5 border border-gray-200 outline-0 focus:outline-1 outline-gray-400 text-xs box-border text-gray-600 font-bold"
      />
      <input
        placeholder="Price"
        name={'price'}
        value={formValue.price}
        onChange={handleChange}
        type="number"
        className="w-[6rem] rounded mt-[0.625rem] p-5 border border-gray-200 outline-0 focus:outline-1 outline-gray-400 text-xs box-border text-gray-600 font-bold"
      />
      <div
        className={
          'font-spartan w-10 ml-4 mt-7 text-xs text-gray-300 font-bold'
        }
      >
        {formValue.total}
      </div>
      <button
        className={isEditForm ? '' : 'mx-2'}
        onClick={() =>
          setItemsRow(item => item.filter(items => items.id !== id))
        }
      >
        <img src={DeleteIcon} width="18rem" alt="logo" className="mt-2" />
      </button>
    </div>
  )
}
export default FormItemsRow
