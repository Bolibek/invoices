import React from 'react'
import * as types from './constant.jsx'
import plus from '../../assets/icon-plus.svg'

const {
  newInvoice,
  del,
  editDark,
  markAsPaid,
  saveAsDraftLight,
  saveAsDraftDark,
  saveChanges,
  saveSend,
  editLight,
  cancel,
  discard,
  addNewItem,
} = types.types

function Button({buttonKind, onClick, className, type, children}) {
  let btnClasses
  let defaultChildren

  if (buttonKind === del) {
    btnClasses = `bg-red   text-gray-100  capitalize w-[5.5rem] h-[3rem] rounded-[1.5rem] hover:bg-red-light `
    defaultChildren = 'delete'
  }
  if (buttonKind === editLight) {
    btnClasses = `capitalize bg-[#F9FAFE] text-gray-400 w-[4.5rem] h-[3rem] rounded-[1.5rem] hover:bg-gray-200 `
    defaultChildren = 'edit'
  }
  if (buttonKind === editDark) {
    btnClasses = `capitalize   text-gray-200 bg-gray-500 w-[4.5rem] h-[3rem] rounded-[1.5rem] hover:bg-gray-100 `
    defaultChildren = 'edit'
  }
  if (buttonKind === newInvoice) {
    btnClasses = `capitalize     text-white bg-purple w-[9.375rem] h-[3rem] rounded-[1.5rem] hover:bg-purple-light `
    defaultChildren = 'newInvoice'
  }
  if (buttonKind === markAsPaid) {
    btnClasses = `   text-white bg-purple w-[8.18rem] h-[3rem] rounded-[1.5rem] hover:bg-purple-light `
    defaultChildren = 'Mark as Paid'
  }
  if (buttonKind === saveAsDraftLight) {
    btnClasses = `   text-gray-300 bg-gray-500 w-[8.31rem] h-[3rem] rounded-[1.5rem] hover:bg-gray-600 `
    defaultChildren = 'Save as Draft'
  }
  if (buttonKind === saveAsDraftDark) {
    btnClasses = `   text-gray-200 bg-gray-500 w-[8.31rem] h-[3rem] rounded-[1.5rem] hover:bg-gray-800 `
    defaultChildren = 'Save as Draft'
  }
  if (buttonKind === addNewItem) {
    btnClasses = `bg-[#F9FAFE] text-gray-400 py-4 px-48 rounded-[1.5rem] hover:bg-gray-200 `

    defaultChildren = 'Add New Item'
  }
  if (buttonKind === cancel) {
    btnClasses = `bg-[#F9FAFE] capitalize text-gray-400  w-[5.6rem] h-[3rem] rounded-[1.5rem] hover:bg-gray-200 `
    defaultChildren = 'cancel'
  }
  if (buttonKind === discard) {
    btnClasses = `bg-[#F9FAFE] capitalize text-gray-400 w-[5.6rem] h-[3rem] rounded-[1.5rem] hover:bg-gray-200 `
    defaultChildren = 'discard'
  }
  if (buttonKind === saveChanges) {
    btnClasses = `capitalize text-white bg-purple w-[8.6rem] h-[3rem] rounded-[1.5rem] hover:bg-purple-light `
    defaultChildren = 'save changes'
  }
  if (buttonKind === saveSend) {
    btnClasses = `bg-purple capitalize text-white w-[8.18rem] h-[3rem] rounded-[1.5rem] hover:bg-purple-light `
    defaultChildren = 'save send'
  }
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex justify-around items-center font-bold text-xs ${btnClasses} ${className}`}
    >
      {defaultChildren === 'newInvoice' ? (
        <>
          <span className="flex justify-center items-center w-[2rem] h-[2rem] rounded-full bg-white text-white">
            <img src={plus} alt="plus" />
          </span>
          <span className={`mr-3 `}>{children || 'New Invoice'}</span>
        </>
      ) : (
        children || defaultChildren
      )}
    </button>
  )
}
export default Button
