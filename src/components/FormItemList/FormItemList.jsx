import React, {useState} from 'react'
import DeleteIcon from '../../assets/icon-delete.svg'

function FormItemsRow({id, itemName, qty, price, total}) {
  const [formValue, setFormValue] = useState({
    [itemName]: itemName,
    [qty]: qty,
    [price]: price,
  })

  function handleChange(event) {
    const {name, value} = event.target
    setFormValue(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div id={id} className="flex mt-4 space-between">
      <input
        placeholder="Item name"
        name={itemName}
        value={formValue[itemName]}
        onChange={handleChange}
        type="text"
        className="max-w-52 rounded mt-[0.625rem] p-4 border border-gray-200 outline-0 focus:outline-1 outline-gray-400 text-xs box-border text-gray-600 font-bold"
      />
      <input
        placeholder="Qty."
        name={qty}
        value={formValue[qty]}
        onChange={handleChange}
        type="number"
        className="max-w-[46px] ml-4 rounded mt-[0.625rem] p-4 border border-gray-200 outline-0 focus:outline-1 outline-gray-400 text-xs box-border text-gray-600 font-bold"
      />
      <input
        placeholder="Price"
        name={price}
        value={formValue[price]}
        onChange={handleChange}
        type="number"
        className="max-w-24 ml-4 rounded mt-[0.625rem] p-4 border border-gray-200 outline-0 focus:outline-1 outline-gray-400 text-xs box-border text-gray-600 font-bold"
      />
      <div
        className={
          'font-spartan w-14 ml-4 mt-7 text-xs text-gray-300 font-bold'
        }
      >
        {total}
      </div>
      <button>
        <img src={DeleteIcon} alt="logo" />
      </button>
    </div>
  )
}
export default FormItemsRow
