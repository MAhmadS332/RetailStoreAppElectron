import React, { useEffect, useRef, useState } from 'react'

const ItemContextMenu = ({ item, closeMenu, addItemToReceipt }) => {
  const [rate, setRate] = useState(0)
  const inputRef = useRef(null)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [])

  return (
    <div
      className={`text-sm lg:text-md xl:text-md box-border overflow-y-clip shadow-sm rounded-md items-center justify-center p-2 h-[72px] lg:h-[80px] w-[110px] lg:w-[110px] xl:w-[118px] border ${item.item_qty === 0 ? 'text-highlight border-highlight bg-red-100 shadow-highlight' : 'text-primary border-primary bg-gray-100 shadow-gray-400'}`}
      onContextMenu={closeMenu}
    >
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => {
          e.preventDefault()
          addItemToReceipt(item, rate)
          setRate(0)
          closeMenu()
        }}
      >
        <input
          ref={inputRef}
          type="number"
          min={0}
          max={99999999}
          value={rate}
          placeholder="Enter Rate..."
          onChange={(e) => setRate(e.target.value)}
          className="border-2 p-1 outline-primary border-primary text-primary bg-transparent w-full"
        />
        <button type="submit" className="bg-primary text-background py-0.5 px-1">
          Use
        </button>
      </form>
    </div>
  )
}

export default ItemContextMenu
