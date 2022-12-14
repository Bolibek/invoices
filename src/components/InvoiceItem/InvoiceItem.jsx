import {Link} from 'react-router-dom'
import {constantColors} from './constantColors'
import rightArrow from '../../assets/icon-arrow-right.svg'

export default function InvoiceItem({
  id,
  paymentDue,
  clientName,
  total,
  status,
}) {
  const clientPaymentDue = `Due ${new Intl.DateTimeFormat('en-UK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(paymentDue))}`
  const clientTotalExpanse = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  }).format(total)
  const activeColorArr = []
  if (status === 'paid') {
    activeColorArr.push(...constantColors.paid)
  }
  if (status === 'pending') {
    activeColorArr.push(...constantColors.pending)
  }
  if (status === 'draft') {
    activeColorArr.push(...constantColors.draft)
  }
  const [bgColor, textColor, dotColor] = activeColorArr
  return (
    <Link className="" to={`/invoice/${id}`}>
      <div className="w-full flex justify-between items-center bg-white h-16  mb-4 px-8 text-lg rounded-xl ">
        <span className="font-bold w-[5rem] text-body-1  ">
          <span className=" text-gray-300">#</span>
          {id}
        </span>
        <span className="text-gray-300 w-24  text-body-1">
          {clientPaymentDue}
        </span>
        <span className="text-gray-300 w-24  text-body-1">{clientName}</span>
        <span className="font-bold text-right text-base w-24 ">
          {clientTotalExpanse}
        </span>
        <div className="flex items-center ">
          <div
            className={`${bgColor} ${textColor} flex w-[7rem]  h-10 font-bold rounded-lg mx-5`}
          >
            <div className="flex m-auto items-center ">
              <div
                className={`h-2 w-2 ${dotColor} mr-2 p-0.5 rounded-full`}
              ></div>
              <span className="text-body-1 capitalize">{status}</span>
            </div>
          </div>
          <span className=" text-purple font-bold  ">
            <img src={rightArrow} alt="Right arrow" />
          </span>
        </div>
      </div>
    </Link>
  )
}
