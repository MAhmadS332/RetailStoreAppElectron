import React from 'react'
import { useSelector } from 'react-redux'

const ItemCard = ({ item, addItemToReceipt, listView = false }) => {
  const settings = useSelector((state) => state.settings.value)
  const CURRENCY = settings[1].setting_value

  return (
    <button
      onClick={() => addItemToReceipt(item)}
      className={
        listView
          ? `flex min-w-full justify-between text-left text-sm lg:text-md xl:text-md box-border overflow-y-clip items-center p-2 w-full border-b-2 text-text border-accent  bg-background shadow-gray-400 hover:bg-accent`
          : `grid grid-rows-[0.5fr_0.9fr_0.5fr] text-sm lg:text-md xl:text-md overflow-y-clip items-center px-2 h-28 w-36 xl:h-36 xl:w-40 border-2 text-text border-accent  bg-background shadow-gray-400 hover:bg-accent `
      }
    >
      <span className="">{item.item_qty}pc</span>

      <div className="font-bUbuntu overflow-hidden break-words text-base xl:text-lg xl:leading-5">
        <span>{item.item_name}</span>
      </div>

      <div className="">
        <span className="text-sm font-bold">{CURRENCY}</span>
        <span>{item.item_price}</span>
      </div>
    </button>
  )
}

export default ItemCard
