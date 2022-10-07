import React, {useRef} from 'react'
import FormInput from '../Form inputs/FormInput.jsx'
import FormDropdown from '../Form inputs/FormDropdown.jsx'
import FormItemsRow from '../FormItemList/FormItemList.jsx'
import Button from '../Button/Button.jsx'

const FormWindow = ({kindModal, id, setOpenWindow, itemData}) => {
  const buttonsRef = useRef(null)
  function getScrollValue(e) {
    /* Bu yerda scrollBottom scrollni pastdagi qiymatini anglatadi,
     bundan maqsad pastga scroll qilganda fixed elementidan shadowni olib tashlash */
    const scrollBottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
    if (scrollBottom < 60) {
      buttonsRef.current.classList.remove(
        'shadow-[0_-60px_70px_-15px_rgba(0,0,0,0.1)]',
      )
    }
    if (scrollBottom > 60) {
      buttonsRef.current.classList.add(
        'shadow-[0_-60px_70px_-15px_rgba(0,0,0,0.1)]',
      )
    }
  }

  function bottomModal() {
    return kindModal === 'edit' ? (
      <>
        <Button
          className={'invisible'}
          buttonKind={'discard'}
          type={'button'}
        />
        <div className="flex">
          <Button
            onClick={() => setOpenWindow(false)}
            buttonKind={'cancel'}
            type={'button'}
          />
          <Button
            buttonKind={'saveChanges'}
            type={'button'}
            className={'ml-2'}
          />
        </div>
      </>
    ) : (
      <>
        <Button
          onClick={() => setOpenWindow(false)}
          buttonKind={'discard'}
          type={'button'}
        />
        <div className="flex">
          <Button buttonKind={'saveAsDraftLight'} type={'button'} />
          <Button buttonKind={'saveSend'} type={'button'} className={'ml-2'} />
        </div>
      </>
    )
  }

  return (
    <div
      onScroll={getScrollValue}
      className="absolute left-0 z-20 bg-white w-[45rem] rounded-r-3xl h-full overflow-y-scroll scroll-smooth scroll-mr-8 scroll-pr-3.5"
    >
      <div className="pr-14 pl-40 pt-14 pb-8">
        <h1 className="font-bold">
          {kindModal === 'edit' ? `Edit ${id}` : 'New Invoice'}
        </h1>
        <p className="body-1 text-purple font-bold mt-12">Bill From</p>
        <FormInput
          labelText={'Street Address'}
          className={'mt-6'}
          inputType={'text'}
        />
        <div className="flex mt-6 w-full flex-wrap justify-between">
          <FormInput
            className={'max-w-[9.5rem]'}
            labelText={'City'}
            inputType={'text'}
          />
          <FormInput
            className={'max-w-[9.5rem]'}
            labelText={'Post Code'}
            inputType={'text'}
          />
          <FormInput
            className={'max-w-[9.5rem]'}
            labelText={'Country'}
            inputType={'text'}
          />
        </div>
        <p className="body-1 text-purple font-bold mt-12">Bill To</p>
        <FormInput
          className={'mt-6'}
          labelText={`Client's name`}
          inputType={'text'}
        />
        <FormInput
          className={'mt-6'}
          labelText={`Client's email`}
          inputType={'email'}
        />
        <FormInput
          className={'mt-6'}
          labelText={'Street Address'}
          inputType={'text'}
        />
        <div className="flex mt-6 w-full flex-wrap justify-between">
          <FormInput
            className={'max-w-[9.5rem]'}
            labelText={'City'}
            inputType={'text'}
          />
          <FormInput
            className={'max-w-[9.5rem]'}
            labelText={'Post Code'}
            inputType={'text'}
          />
          <FormInput
            className={'max-w-[9.5rem]'}
            labelText={'Country'}
            inputType={'text'}
          />
        </div>
        <div className="flex mt-6 w-full flex-wrap justify-between">
          <FormInput
            className={'w-60 pr-4'}
            labelText={'Invoice Date'}
            inputType={'date'}
          />
          <FormDropdown
            className={'w-60 pl-4'}
            labelText={'Payment Terms'}
            inputType={'text'}
          />
        </div>
        <FormInput
          className={'mt-6'}
          labelText={'Project Description'}
          inputType={'email'}
        />
        <h4 className="body-2 mt-8 text-[#777F98] text-[18px] font-bold">
          Item List
        </h4>
        <div className="flex content-between mt-4">
          <p className={'font-spartan text-xs w-52 text-gray-400 font-medium'}>
            Item Name
          </p>
          <p className={'font-spartan text-xs w-12 text-gray-400 font-medium'}>
            Qty.
          </p>
          <p className={'font-spartan text-xs w-24 text-gray-400 font-medium'}>
            Price
          </p>
          <p className={'font-spartan text-xs w-14 text-gray-400 font-medium'}>
            Total
          </p>
        </div>

        {kindModal === 'edit' ? (
          itemData.map(items => (
            <FormItemsRow
              key={items.id}
              id={items.id}
              itemName={items.name}
              qty={items.quantity}
              price={items.price}
              total={items.total}
            />
          ))
        ) : (
          <FormItemsRow
            id={1}
            itemName={''}
            qty={0}
            price={0}
            total={0}
          /> /* Bu yerini POST methodini qiladiigan dasturchi tugatib qo'yadi */
        )}

        <Button className={'mt-5'} buttonKind={'addNewItem'} type={'button'} />
      </div>
      <div
        ref={buttonsRef}
        className="mt-2.5 shadow-[0_-60px_70px_-15px_rgba(0,0,0,0.1)] bg-white py-8 pr-14 pl-40 rounded-br-[20px] rounded-tr-[20px] flex sticky bottom-0 justify-between"
      >
        {bottomModal()}
      </div>
    </div>
  )
}
export default FormWindow
