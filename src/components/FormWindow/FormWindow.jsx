import React, {useRef, useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import FormInput from '../FormInputs/FormInput.jsx'
import FormDropdown from '../FormInputs/FormDropdown.jsx'
import FormItemsRow from '../FormItemList/FormItemList.jsx'
import Button from '../Button/Button.jsx'
import {
  useAddInvoiceMutation,
  useInvoiceItemDetailsQuery,
  useUpdateInvoiceMutation,
} from '../../services/invoiceApi'
import {formatDate} from '../../utils/index'

const FormWindow = ({setOpenWindow, kindModal}) => {
  const buttonsRef = useRef(null)
  const [addInvoice] = useAddInvoiceMutation()
  const [defaultStatus, setDefaultStatus] = useState('pending')
  const [isDraft, setIsDraft] = useState(false)
  // eslint-disable-next-line
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const newInvoiceId = uuidv4().slice(0, 8).toUpperCase()
  const [updateInvoice] = useUpdateInvoiceMutation()
  const {invoiceId} = useParams()
  const {data = {}} = useInvoiceItemDetailsQuery(invoiceId)
  const {
    _id,
    paymentDue,
    paymentTerms,
    description,
    clientName,
    clientEmail,
    senderAddress,
    clientAddress,
    status,
    items,
  } = kindModal === 'editLight' && data
  const [itemsRow, setItemsRow] = useState(
    kindModal === 'editLight' ? items : [],
  )
  useEffect(() => {
    kindModal === 'editLight' && setItemsRow(itemsRow)
    // eslint-disable-next-line
  }, [])
  function getScrollValue(e) {
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
  const handleChangeStatusToDraft = () => {
    setDefaultStatus('draft')
    setIsDraft(true)
  }
  const handle = async e => {
    e.preventDefault()
    isDraft && handleChangeStatusToDraft()
    try {
      if (kindModal === 'editLight') {
        const newData = {
          ...data,
          status,
          senderAddress: {
            street: e.target[0].value,
            city: e.target[1].value,
            postCode: e.target[2].value,
            country: e.target[3].value,
          },
          clientName: e.target[4].value,
          clientEmail: e.target[5].value,
          clientAddress: {
            street: e.target[6].value,
            city: e.target[7].value,
            postCode: e.target[8].value,
            country: e.target[9].value,
          },
          paymentDue: formatDate(e.target[10].value),
          paymentTerms: e.target[11].value,
          description: e.target[12].value,
          items: itemsRow,
        }
        updateInvoice({_id, ...newData}).unwrap()
        navigate(`/invoice/${invoiceId}`)
        window.location.reload(false)
      } else {
        await addInvoice({
          id: newInvoiceId,
          status: defaultStatus,
          senderAddress: {
            street: e.target[0].value,
            city: e.target[1].value,
            postCode: e.target[2].value,
            country: e.target[3].value,
          },
          clientName: e.target[4].value,
          clientEmail: e.target[5].value,
          clientAddress: {
            street: e.target[6].value,
            city: e.target[7].value,
            postCode: e.target[8].value,
            country: e.target[9].value,
          },
          paymentDue: formatDate(e.target[10].value),
          createdAt: formatDate(new Date()),
          paymentTerms: e.target[11].value,
          description: e.target[12].value,
          items: itemsRow,
        }).unwrap()
        setDefaultStatus('')
        setIsDraft(false)
      }
    } catch (err) {
      setError(err)
    }
    setOpenWindow(false)
  }
  function BottomModal() {
    return kindModal === 'editLight' ? (
      <div className="flex justify-between w-[30rem] ml-1">
        <Button
          onClick={() => setOpenWindow(false)}
          buttonKind={'cancel'}
          type={'button'}
        />
        <Button buttonKind={'saveChanges'} type={'submit'} className={'ml-2'} />
      </div>
    ) : (
      <>
        <Button
          onClick={() => setOpenWindow(false)}
          buttonKind={'discard'}
          type={'button'}
        />
        <div className="flex">
          <Button
            buttonKind={'saveAsDraftLight'}
            type={'submit'}
            onClick={handleChangeStatusToDraft}
          />
          <Button
            buttonKind={'saveSend'}
            type={'submit'}
            form="formWindow"
            className={'ml-2'}
          />
        </div>
      </>
    )
  }
  return (
    <div
      onScroll={getScrollValue}
      className="absolute left-0 z-20 bg-white w-[1100px] rounded-r-3xl h-full overflow-y-scroll scroll-smooth scroll-mr-8 scroll-pr-3.5"
    >
      <form onSubmit={handle} id="formWindow">
        <div className="pr-14 pl-40 pt-14 pb-8">
          <h1 className="font-bold">{`${
            kindModal === 'editLight' ? `Edit #${invoiceId}` : 'New Invoice'
          }`}</h1>
          <p className="body-1 text-purple font-bold mt-12">Bill From</p>
          <FormInput
            labelText={'Street Address'}
            className={'mt-6'}
            inputType={'text'}
            inputValue={kindModal === 'editLight' ? senderAddress.street : ''}
            name={'senderAddress.street'}
          />
          <div className="flex mt-6 w-full flex-wrap justify-between">
            <FormInput
              className={'max-w-[9.5rem]'}
              labelText={'City'}
              inputType={'text'}
              inputValue={kindModal === 'editLight' ? senderAddress.city : ''}
            />
            <FormInput
              className={'max-w-[9.5rem]'}
              labelText={'Post Code'}
              inputType={'text'}
              inputValue={
                kindModal === 'editLight' ? senderAddress.postCode : ''
              }
            />
            <FormInput
              className={'max-w-[9.5rem]'}
              labelText={'Country'}
              inputType={'text'}
              inputValue={
                kindModal === 'editLight' ? senderAddress.country : ''
              }
              name={'senderAddress.country'}
            />
          </div>
          <p className="body-1 text-purple font-bold mt-12">Bill To</p>
          <FormInput
            className={'mt-6'}
            labelText={`Client's name`}
            inputType={'text'}
            inputValue={kindModal === 'editLight' ? clientName : ''}
            name={'clientName'}
          />
          <FormInput
            className={'mt-6'}
            labelText={`Client's email`}
            inputType={'email'}
            inputValue={kindModal === 'editLight' ? clientEmail : ''}
            name={'clientEmail'}
          />
          <FormInput
            className={'mt-6'}
            labelText={'Street Address'}
            inputType={'text'}
            inputValue={kindModal === 'editLight' ? clientAddress.street : ''}
            name={'clientAddress.street'}
          />
          <div className="flex mt-6 w-full flex-wrap justify-between">
            <FormInput
              className={'max-w-[9.5rem]'}
              labelText={'City'}
              inputType={'text'}
              inputValue={kindModal === 'editLight' ? clientAddress.city : ''}
              name={'clientAddress.city'}
            />
            <FormInput
              className={'max-w-[9.5rem]'}
              labelText={'Post Code'}
              inputType={'text'}
              inputValue={
                kindModal === 'editLight' ? clientAddress.postCode : ''
              }
              name={'clientAddress.postCode'}
            />
            <FormInput
              className={'max-w-[9.5rem]'}
              labelText={'Country'}
              inputType={'text'}
              inputValue={
                kindModal === 'editLight' ? clientAddress.country : ''
              }
              name={'clientAddress.country'}
            />
          </div>
          <div className="flex mt-6 w-full flex-wrap justify-between">
            <FormInput
              className={'w-60 pr-4'}
              labelText={'Invoice Date'}
              inputType={'date'}
              inputValue={kindModal === 'editLight' ? paymentDue : ''}
              name={'paymentDue'}
            />
            <FormDropdown
              className={'w-60 pl-4'}
              labelText={'Payment Terms'}
              inputType={'text'}
              inputValue={kindModal === 'editLight' ? paymentTerms : ''}
              name={'paymentTerms'}
            />
          </div>
          <FormInput
            className={'mt-6'}
            labelText={'Project Description'}
            inputType={'text'}
            inputValue={kindModal === 'editLight' ? description : ''}
          />
          <h4 className="body-2 mt-8  text-[#777F98] text-[18px] font-bold">
            Item List
          </h4>
          <div className="flex flex-row pl-2 mt-4">
            <p
              className={
                'font-spartan mr-12 text-xs w-52 text-gray-400 font-medium'
              }
            >
              Item Name
            </p>
            <p
              className={
                'font-spartan mr-6 text-xs w-12 text-gray-400 font-medium'
              }
            >
              Qty.
            </p>
            <p
              className={'font-spartan text-xs w-24 text-gray-400 font-medium'}
            >
              Price
            </p>
            <p
              className={'font-spartan text-xs w-14 text-gray-400 font-medium'}
            >
              Total
            </p>
          </div>
          {itemsRow &&
            itemsRow.map(item => (
              <FormItemsRow
                key={item.id}
                id={item.id}
                name={kindModal === 'editLight' ? item.name : 'name'}
                qty={kindModal === 'editLight' ? item.qty : 'qty'}
                price={kindModal === 'editLight' ? item.price : 'price'}
                total={kindModal === 'editLight' ? item.total : 'total'}
                itemsRow={itemsRow}
                setItemsRow={setItemsRow}
                isEditForm={kindModal === 'editLight' && true}
              />
            ))}
          <Button
            onClick={() =>
              setItemsRow(prev => [
                ...prev,
                {
                  id: prev.length + 1,
                  name: 'name',
                  qty: 0,
                  price: 0,
                  total: 0,
                },
              ])
            }
            className={'mt-5'}
            buttonKind={'addNewItem'}
            type={'button'}
          />
        </div>

        <div
          ref={buttonsRef}
          className="mt-2.5 shadow-[0_-60px_70px_-15px_rgba(0,0,0,0.1)] bg-white py-8 pr-14 pl-40 rounded-br-[20px] rounded-tr-[20px] flex sticky bottom-0 justify-between"
        >
          <BottomModal />
        </div>
      </form>
    </div>
  )
}
export default FormWindow
