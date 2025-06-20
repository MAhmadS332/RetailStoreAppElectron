import React from 'react'
import { useSelector } from 'react-redux'

const ItemCardList = ({ item, addItemToReceipt }) => {
  const settings = useSelector((state) => state.settings.value)
  const CURRENCY = settings[1].setting_value

  return (
    <button
      onClick={() => addItemToReceipt(item)}
      className={`grid text-start grid-rows-[0.5fr_0.9fr_0.5fr] text-sm lg:text-md xl:text-md box-border leading-3 lg:leading-[15px] overflow-y-clip shadow-sm rounded-md items-center p-2 min-h-[72px] lg:min-h-[80px] w-[110px] lg:w-[110px] xl:w-[118px] border-2 ${item.item_qty === 0 ? 'text-highlight border-highlight shadow-highlight hover:bg-red-300' : 'text-text border-accent  bg-background shadow-gray-400 hover:bg-accent'}`}
    >
      <span className="">{item.item_qty}pc</span>

      <div className="font-bUbuntu overflow-hidden break-words xl:text-lg xl:leading-[16px]">
        {item.item_name}
      </div>

      <div className="">
        <span className="text-sm font-bold">{CURRENCY}</span>
        <span>{item.item_price}</span>
      </div>
    </button>
  )
}

export default ItemCardList
