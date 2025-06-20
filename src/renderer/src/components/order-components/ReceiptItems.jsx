import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ReceiptItems = ({ receiptItemsFunctions }) => {
  const receiptItems = useSelector((state) => state.currentOrder.value.items)

  const titleStyle = 'pt-0.5 px-2 text-sm md:text-base lg:text-lg font-bUbuntu'
  const settings = useSelector((state) => state.settings.value)
  const CURRENCY = settings[1].setting_value || '$'

  return (
    <ul className="w-full px-2 rounded-md text-text text-sm md:text-base h-full oveflow-y-auto overflow-x-hidden">
      {receiptItems &&
        receiptItems.map((item, index) => (
          <li
            key={item.item_id}
            className={` justify-evenly items-center py-0.5 border-b border-accent`}
          >
            <div className="flex items-center justify-between">
              <div className={titleStyle}>{item.item_name}</div>
              <div className="flex gap-1">
               
                <button
                  className="w-max flex justify-center bg-highlight hover:bg-red-500"
                  onClick={() => receiptItemsFunctions.removeItemFromReceipt(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    className="fill-header-text"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-[60%_30%] items-center justify-between">
              <div className="flex items-center">
                <span className="px-2 italic text-sm">{CURRENCY}</span>
                <input
                  className={
                    'text-sm md:text-base bg-background lg:text-base italic focus:outline-none focus-within:outline-none'
                  }
                  value={item.item_price}
                  min = {0}
                  max = {9999999999}
                  type="number"
                  onClick={(e) => e.target.select()}
                  onChange={(e) => receiptItemsFunctions.changeItemPrice(item, e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <button
                  className=" bg-primary text-header-text border border-accent text-sm font-bold px-1.5"
                  title='Press "Ctrl" to decrease by 10'
                  onClick={(event) => {
                    if (event.ctrlKey) {
                      receiptItemsFunctions.decreaseItemQty(item, 10)
                    } else {
                      receiptItemsFunctions.decreaseItemQty(item)
                    }
                  }}
                >
                  -
                </button>
                <span className="px-2">
                  <span>{item.qty}</span>
                </span>
                <button
                  className=" bg-primary text-header-text border border-accent font-bold text-sm px-1"
                  title='Press "Ctrl" to increase by 10'
                  onClick={(event) => {
                    if (event.ctrlKey) {
                      receiptItemsFunctions.increaseItemQty(item, 10)
                    } else {
                      receiptItemsFunctions.increaseItemQty(item)
                    }
                  }}
                >
                  +
                </button>
              </div>
              {item.qty > item.item_qty && (
                <div className=" text-highlight flex items-center gap-1 px-2 w-max mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    className="fill-highlight"
                  >
                    <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
                  </svg>
                  <span>Selected Qty is more than available!</span>
                </div>
              )}
            </div>
            {/* <span className={titleStyle}>{item.qty * item.item_price}</span> */}
          </li>
        ))}
    </ul>
  )
}

export default ReceiptItems
