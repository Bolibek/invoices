import {Fragment, useState, useId, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Menu, Transition} from '@headlessui/react'
import InvoiceItem from '../../components/InvoiceItem/InvoiceItem.jsx'
import FormWindow from '../../components/FormWindow/FormWindow.jsx'
import Button from '../../components/Button/Button.jsx'
import ArrowDownIcon from '../../assets/icon-arrow-down.svg'
import ArrowUpIcon from '../../assets/icon-arrow-up.svg'
import EmptyEmail from '../../assets/illustration-empty.svg'
import {useInvoicesQuery} from '../../services/invoiceApi'
import {setDatas} from '../../app/store'

function Homepage() {
  const [openWindow, setOpenWindow] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const statusId = useId()
  const [statusCheck, setStatusCheck] = useState({
    draft: false,
    pending: false,
    paid: false,
  })
  const allStatus = Object.keys(statusCheck)
  const chosenStatus = allStatus.filter(item => statusCheck[item])
  const datas = useSelector(state => state.invoice.datas)
  const dispatch = useDispatch()
  const {data, isLoading, isSuccess} = useInvoicesQuery()
  useEffect(() => {
    dispatch(setDatas(data))
    // eslint-disable-next-line
  }, [data])
  useEffect(() => {
    if (!statusCheck.draft && !statusCheck.pending && !statusCheck.paid) {
      dispatch(setDatas(datas))
      return
    }
    const filtered = datas?.filter(item => statusCheck[item.status])
    dispatch(setDatas(filtered))
    // eslint-disable-next-line
  }, [statusCheck])

  const handleChange = e => {
    setStatusCheck({
      ...statusCheck,
      [e.target.value]: !statusCheck[e.target.value],
    })
  }
  return (
    <div className="w-[50rem] h-screen overflow-auto  ">
      {openWindow && (
        <>
          <FormWindow setOpenWindow={setOpenWindow} />
        </>
      )}
      <div className="  flex justify-between  h-16 mt-12  items-center mb-16 ">
        <div className=" flex flex-col  ">
          <h1 className="text-white font-bold  ">Invoices</h1>
          <p className="text-body-1 text-gray-200 font-normal ">
            {datas?.length > 0
              ? `There are  ${datas.length} total ${chosenStatus} ${
                  datas.length > 1 ? 'invoices' : 'invoice'
                }`
              : 'No invoices'}
          </p>
        </div>
        <div className="flex items-center  ">
          <Menu as="div" className="mr-6 relative w-40 ">
            <Menu.Button
              onClick={() => setShowStatus(!showStatus)}
              className="flex items-center m-auto "
            >
              <span className="font-bold text-body-1 text-gray-100 mr-4 ">
                Filter by status
              </span>
              <img
                src={showStatus ? ArrowUpIcon : ArrowDownIcon}
                alt="arrow-down-icon"
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute mt-6 h-32 w-48   rounded-lg bg-white shadow-[0_10px_20px_rgba(72,84,159,0.25)]">
                {allStatus.map(status => (
                  <Menu.Item key={`${statusId}${status}`}>
                    <label
                      htmlFor={status}
                      className="text-gray-900 group  flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer"
                    >
                      <input
                        onChange={handleChange}
                        value={status}
                        type="checkbox"
                        className="mr-2 accent-purple  cursor-pointer  "
                        id={status}
                        checked={statusCheck[`${status}`]}
                      />
                      {status}
                    </label>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          <Button
            buttonKind="newInvoice"
            onClick={() => setOpenWindow(true)}
            type="button"
          >
            New Invoice
          </Button>
        </div>
      </div>
      {/* main part */}
      {isLoading && <h2>Loading...</h2>}
      {isSuccess &&
        datas?.map(invoice => <InvoiceItem key={invoice.id} {...invoice} />)}
      {(!data || data.length === 0) && (
        <div className="m-auto w-72  my-10 flex flex-col items-center  ">
          <img src={EmptyEmail} alt="" />
          <h2 className="text-gray-500 font-bold mt-6">
            There is nothing here
          </h2>
          <p className="text-body-1 text-gray-600 text-center mt-4 w-42 ">
            Create an invoice by clicking the
            <br />
            <span className="font-bold"> New Invoice</span> button and get
            started
          </p>
        </div>
      )}
    </div>
  )
}

export default Homepage
