import React from 'react'

export default function ItemRow({itemData}) {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <strong className="flex text-xs my-3">{itemData[0].name}</strong>
        </div>
        <div className="flex justify-between w-1/2">
          <span className="text-gray-400 my-3 ml-6">
            {itemData[0].quantity}
          </span>
          <span className="capitalize text-gray-400 my-3">
            <span className="mr-1">£</span>
            {itemData[0].price}.00
          </span>
          <span className="font-bold my-3">
            <span className="mr-1">£</span>
            {itemData[0].total}.00
          </span>
        </div>
      </div>
      {itemData[1] && (
        <div className="flex justify-between">
          <strong className="flex text-xs my-3">{itemData[1].name}</strong>

          <div className="flex justify-between w-1/2">
            <span className="text-gray-400 my-3 ml-6">
              {itemData[1].quantity}
            </span>

            <span className="capitalize text-gray-400 my-3">
              <span className="mr-1">£</span>
              {itemData[1].price}.00
            </span>
            <span className="font-bold my-3">
              <span className="mr-1">£</span>
              {itemData[1].total}.00
            </span>
          </div>
        </div>
      )}
    </>
  )
}
