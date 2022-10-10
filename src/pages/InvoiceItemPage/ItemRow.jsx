import React from 'react'

export default function ItemRow({items}) {
  return (
    <>
      {items.length &&
        items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <strong className="flex text-xs my-3">
                {items.length ? item.name : 'No items'}
              </strong>
            </div>
            <div className="flex justify-between w-1/2">
              <span className="text-gray-400 my-3 ml-6">
                {items.length ? item.qty : 0}
              </span>
              <span className="capitalize text-gray-400 my-3">
                <span className="mr-1">£</span>
                {items.length ? item.price : 0}.00
              </span>
              <span className="font-bold my-3">
                <span className="mr-1">£</span>
                {items.length ? item.total : 0}.00
              </span>
            </div>
          </div>
        ))}
    </>
  )
}
